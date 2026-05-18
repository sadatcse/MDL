import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

// MongoDB connection URI must be configured inside .env.local as MONGODB_URI

let mongoConnection = null;

// Dynamic Schema to support any fields exactly like MySQL tables
const DynamicSchema = new mongoose.Schema({}, { strict: false, id: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export function getModel(collectionName) {
  const name = collectionName.toLowerCase();
  if (mongoose.models[name]) {
    return mongoose.models[name];
  }
  return mongoose.model(name, DynamicSchema, name);
}

// Wrapper to ensure backward compatibility with any files calling connectDB
export async function connectDB() {
  return connectMongo();
}

export async function connectMongo() {
  if (!mongoConnection) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables! Please configure it in .env.local.');
    }
    try {
      mongoose.set('strictQuery', false);
      mongoConnection = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000, // Fail fast: 5 seconds connection timeout
      });
      console.log('✅ Connected to MongoDB Database successfully.');
      
      // Trigger background auto-seeding if collection is empty
      autoSyncData().catch(err => console.error('MongoDB seeding error:', err));
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      throw error;
    }
  }
  return mongoConnection;
}

// Map MongoDB doc to standard MySQL-like flat object
function mapDoc(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  if (obj._id) {
    obj._id = obj._id.toString();
    if (!obj.id) obj.id = obj._id;
  }
  return obj;
}

// Auto-seed MongoDB from local files if empty
async function autoSyncData() {
  const collections = ['projects', 'testimonials', 'updates', 'users'];
  
  for (const coll of collections) {
    const Model = getModel(coll);
    try {
      const count = await Model.countDocuments();
      if (count === 0) {
        console.log(`MongoDB: Collection '${coll}' is empty. Seeding from local files...`);
        if (coll === 'projects') {
          const pPath = path.join(process.cwd(), 'src/data/projects.json');
          if (fs.existsSync(pPath)) {
            const data = JSON.parse(fs.readFileSync(pPath, 'utf8'));
            await Model.insertMany(data);
            console.log(`✅ Seeded 'projects' from projects.json (${data.length} items)`);
          }
        } else if (coll === 'updates') {
          const uPath = path.join(process.cwd(), 'src/data/updates.json');
          if (fs.existsSync(uPath)) {
            const data = JSON.parse(fs.readFileSync(uPath, 'utf8'));
            await Model.insertMany(data);
            console.log(`✅ Seeded 'updates' from updates.json (${data.length} items)`);
          }
        } else if (coll === 'testimonials') {
          const testimonialsList = [
            {
              name: "G.M. Jainal Abedin Bhuiya",
              role: "Business Consultant",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
              text: "A clear reflection of quality and professionalism. Thank you to the entire MDL team who put in their effort to make this happen.",
              rating: 5
            },
            {
              name: "Sarah Mahmud",
              role: "Interior Designer",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
              text: "Their attention to detail in architectural finishes is unmatched. Working with MDL has shown me their commitment to excellence.",
              rating: 5
            },
            {
              name: "Engr. Rafiqul Islam",
              role: "Structural Engineer",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
              text: "As a professional in the industry, I highly value structural integrity. MDL projects consistently meet the highest standards.",
              rating: 5
            },
            {
              name: "Tanvir Ahmed",
              role: "Tech Entrepreneur",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
              text: "The handover process was seamless. The transparency and professionalism at MDL are truly world-class in every aspect.",
              rating: 5
            },
            {
              name: "Nusrat Jahan",
              role: "Doctor",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
              text: "MDL doesn't just build apartments; they create homes. The community and amenities provided are perfect for a modern family.",
              rating: 5
            },
            {
              name: "Imtiaz Karim",
              role: "Architect",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
              text: "Designing with MDL has been a pleasure. Their ability to translate complex blueprints into stunning reality is commendable.",
              rating: 5
            }
          ];
          await Model.insertMany(testimonialsList);
          console.log(`✅ Seeded 'testimonials' from hardcoded array.`);
        } else if (coll === 'users') {
          const hashedPassword = await bcrypt.hash('admin123', 10);
          await Model.create({
            email: 'admin@mdl.com',
            full_name: 'MDL Admin',
            password: hashedPassword,
            role: 'admin',
            mobile: '01700000000'
          });
          console.log(`✅ Seeded default admin user in 'users'.`);
        }
      }
    } catch (err) {
      console.error(`Error during seed check for '${coll}':`, err);
    }
  }
}

// The core SQL-to-MongoDB translation engine
async function executeMongoQuery(sql, params = []) {
  await connectMongo();
  
  console.log(`MongoDB Fallback Engine running query: "${sql.slice(0, 100)}..."`);
  
  if (/SHOW\s+TABLES/i.test(sql)) {
    return [
      { Tables_in_db: 'projects' },
      { Tables_in_db: 'testimonials' },
      { Tables_in_db: 'updates' },
      { Tables_in_db: 'users' },
      { Tables_in_db: 'contacts' }
    ];
  }
  
  let tableName = '';
  const tableMatch = sql.match(/(?:FROM|INTO|UPDATE|DELETE\s+FROM)\s+[`"]?(\w+)[`"]?/i);
  if (tableMatch) {
    tableName = tableMatch[1];
  } else {
    throw new Error(`Could not parse table name from SQL: ${sql}`);
  }
  
  const Model = getModel(tableName);
  
  if (/^SELECT/i.test(sql)) {
    const filter = {};
    
    if (sql.includes('slug = ? OR id = ?') || sql.includes('id = ? OR slug = ?')) {
      const idVal = params[0];
      const isNum = !isNaN(Number(idVal));
      filter.$or = [
        { slug: String(idVal) },
        { id: isNum ? Number(idVal) : idVal }
      ];
      if (mongoose.Types.ObjectId.isValid(String(idVal))) {
        filter.$or.push({ _id: idVal });
      }
    } else if (sql.includes('email = ?')) {
      filter.email = params[0];
    } else if (sql.includes('id = ?')) {
      const idVal = params[0];
      const isNum = !isNaN(Number(idVal));
      filter.$or = [
        { id: isNum ? Number(idVal) : idVal }
      ];
      if (mongoose.Types.ObjectId.isValid(String(idVal))) {
        filter.$or.push({ _id: idVal });
      }
    } else {
      const fields = [];
      const regex = /(\w+)\s*=\s*\?/g;
      let match;
      while ((match = regex.exec(sql)) !== null) {
        fields.push(match[1]);
      }
      fields.forEach((field, index) => {
        filter[field] = params[index];
      });
    }
    
    let sortObj = {};
    if (/ORDER\s+BY\s+(\w+)\s+DESC/i.test(sql)) {
      const sortField = sql.match(/ORDER\s+BY\s+(\w+)\s+DESC/i)[1];
      sortObj[sortField] = -1;
    } else if (/ORDER\s+BY\s+(\w+)\s+ASC/i.test(sql)) {
      const sortField = sql.match(/ORDER\s+BY\s+(\w+)\s+ASC/i)[1];
      sortObj[sortField] = 1;
    }
    
    const docs = await Model.find(filter).sort(sortObj).lean();
    return docs.map(mapDoc);
  }
  
  if (/^INSERT/i.test(sql)) {
    const insertMatch = sql.match(/INSERT\s+INTO\s+[`"]?\w+[`"]?\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
    if (!insertMatch) {
      throw new Error(`Could not parse INSERT statement: ${sql}`);
    }
    
    const cols = insertMatch[1].split(',').map(c => c.replace(/[`"]/g, '').trim());
    const doc = {};
    cols.forEach((col, index) => {
      let val = params[index];
      if (typeof val === 'string') {
        if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('{') && val.endsWith('}'))) {
          try {
            val = JSON.parse(val);
          } catch (e) {}
        }
      }
      doc[col] = val;
    });
    
    if (!doc.id) {
      const highestDoc = await Model.findOne().sort({ id: -1 });
      doc.id = highestDoc && typeof highestDoc.id === 'number' ? highestDoc.id + 1 : Date.now();
    }
    
    const newDoc = await Model.create(doc);
    return { insertId: newDoc.id || newDoc._id.toString(), affectedRows: 1 };
  }
  
  if (/^UPDATE/i.test(sql)) {
    const updateMatch = sql.match(/UPDATE\s+[`"]?\w+[`"]?\s+SET\s+([^]+?)\s+WHERE\s+([^]+)$/i);
    if (!updateMatch) {
      throw new Error(`Could not parse UPDATE statement: ${sql}`);
    }
    
    const setClause = updateMatch[1];
    const whereClause = updateMatch[2];
    
    const setCols = [];
    const setRegex = /(\w+)\s*=\s*\?/g;
    let m;
    while ((m = setRegex.exec(setClause)) !== null) {
      setCols.push(m[1]);
    }
    
    const updateDoc = {};
    setCols.forEach((col, index) => {
      let val = params[index];
      if (typeof val === 'string') {
        if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('{') && val.endsWith('}'))) {
          try {
            val = JSON.parse(val);
          } catch (e) {}
        }
      }
      updateDoc[col] = val;
    });
    
    const whereParams = params.slice(setCols.length);
    const filterObj = {};
    
    if (whereClause.includes('slug = ? OR id = ?') || whereClause.includes('id = ? OR slug = ?')) {
      const idVal = whereParams[0];
      const isNum = !isNaN(Number(idVal));
      filterObj.$or = [
        { slug: String(idVal) },
        { id: isNum ? Number(idVal) : idVal }
      ];
      if (mongoose.Types.ObjectId.isValid(String(idVal))) {
        filterObj.$or.push({ _id: idVal });
      }
    } else if (whereClause.includes('id = ?')) {
      const idVal = whereParams[0];
      const isNum = !isNaN(Number(idVal));
      filterObj.$or = [
        { id: isNum ? Number(idVal) : idVal }
      ];
      if (mongoose.Types.ObjectId.isValid(String(idVal))) {
        filterObj.$or.push({ _id: idVal });
      }
    } else {
      const fields = [];
      const regex = /(\w+)\s*=\s*\?/g;
      let match;
      while ((match = regex.exec(whereClause)) !== null) {
        fields.push(match[1]);
      }
      fields.forEach((field, index) => {
        filterObj[field] = whereParams[index];
      });
    }
    
    const res = await Model.updateMany(filterObj, { $set: updateDoc });
    return { affectedRows: res.modifiedCount };
  }
  
  if (/^DELETE/i.test(sql)) {
    const deleteMatch = sql.match(/DELETE\s+FROM\s+[`"]?\w+[`"]?\s+WHERE\s+([^]+)$/i);
    if (!deleteMatch) {
      throw new Error(`Could not parse DELETE statement: ${sql}`);
    }
    
    const whereClause = deleteMatch[1];
    const filterObj = {};
    
    if (whereClause.includes('slug = ? OR id = ?') || whereClause.includes('id = ? OR slug = ?')) {
      const idVal = params[0];
      const isNum = !isNaN(Number(idVal));
      filterObj.$or = [
        { slug: String(idVal) },
        { id: isNum ? Number(idVal) : idVal }
      ];
      if (mongoose.Types.ObjectId.isValid(String(idVal))) {
        filterObj.$or.push({ _id: idVal });
      }
    } else if (whereClause.includes('id = ?')) {
      const idVal = params[0];
      const isNum = !isNaN(Number(idVal));
      filterObj.$or = [
        { id: isNum ? Number(idVal) : idVal }
      ];
      if (mongoose.Types.ObjectId.isValid(String(idVal))) {
        filterObj.$or.push({ _id: idVal });
      }
    } else {
      const fields = [];
      const regex = /(\w+)\s*=\s*\?/g;
      let match;
      while ((match = regex.exec(whereClause)) !== null) {
        fields.push(match[1]);
      }
      fields.forEach((field, index) => {
        filterObj[field] = params[index];
      });
    }
    
    const res = await Model.deleteMany(filterObj);
    return { affectedRows: res.deletedCount };
  }
  
  throw new Error(`Unsupported SQL query: ${sql}`);
}

function normalizeRow(row) {
  if (!row) return row;
  const newRow = { ...row };

  // 1. Normalize JSON fields
  const jsonFields = ['photos', 'amenities', 'features', 'flat_types'];
  jsonFields.forEach(field => {
    if (newRow[field] !== undefined) {
      const val = newRow[field];
      if (typeof val === 'string') {
        if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('{') && val.endsWith('}'))) {
          try {
            newRow[field] = JSON.parse(val);
          } catch (e) {
            newRow[field] = [];
          }
        } else {
          newRow[field] = [];
        }
      } else if (val === null || val === undefined) {
        newRow[field] = [];
      }
    }
  });

  // 2. Normalize boolean fields
  const booleanFields = ['for_sale', 'registration_open'];
  booleanFields.forEach(field => {
    if (newRow[field] !== undefined) {
      newRow[field] = newRow[field] === 1 || newRow[field] === true || String(newRow[field]) === '1';
    }
  });

  // 3. Normalize numeric fields where appropriate
  const numericFields = ['id', 'total_floors', 'total_units', 'year_started', 'year_completion', 'rating'];
  numericFields.forEach(field => {
    if (newRow[field] !== undefined && newRow[field] !== null) {
      const num = Number(newRow[field]);
      if (!isNaN(num)) {
        newRow[field] = num;
      }
    }
  });

  return newRow;
}

export async function query(sql, params) {
  const trimmedSql = sql.trim();
  try {
    // Connect to MongoDB if not already connected
    await connectMongo();
    
    // Execute SQL translation engine directly on MongoDB
    const mongoResult = await executeMongoQuery(trimmedSql, params);
    
    // Normalize results (e.g. format JSON fields, booleans, and numeric fields)
    if (Array.isArray(mongoResult)) {
      return mongoResult.map(normalizeRow);
    } else if (mongoResult && typeof mongoResult === 'object') {
      return mongoResult;
    }
    
    return mongoResult;
  } catch (error) {
    console.error('MongoDB native query execution failed:', error.message);
    throw error;
  }
}
