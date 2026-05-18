import Swal from 'sweetalert2';

/**
 * Show a premium success alert
 */
export const showSuccess = (title, text = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    customClass: {
      popup: '!rounded-[24px] !border !border-zinc-100 dark:!border-zinc-900 !bg-white dark:!bg-zinc-950 !text-foreground !shadow-2xl',
      title: '!font-black !tracking-tight !text-brand-green',
      htmlContainer: '!text-zinc-600 dark:!text-zinc-400 !font-medium',
      confirmButton: 'px-8 py-3.5 bg-brand-green text-white rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-green/20 cursor-pointer'
    },
    buttonsStyling: false
  });
};

/**
 * Show a premium error alert
 */
export const showError = (title, text = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    customClass: {
      popup: '!rounded-[24px] !border !border-zinc-100 dark:!border-zinc-900 !bg-white dark:!bg-zinc-950 !text-foreground !shadow-2xl',
      title: '!font-black !tracking-tight !text-red-600',
      htmlContainer: '!text-zinc-600 dark:!text-zinc-400 !font-medium',
      confirmButton: 'px-8 py-3.5 bg-red-600 text-white rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/20 cursor-pointer'
    },
    buttonsStyling: false
  });
};

/**
 * Show a premium confirm alert for dangerous actions (like deletion)
 */
export const showConfirm = async (title, text = '', confirmButtonText = 'Yes, delete it!') => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    customClass: {
      popup: '!rounded-[24px] !border !border-zinc-100 dark:!border-zinc-900 !bg-white dark:!bg-zinc-950 !text-foreground !shadow-2xl',
      title: '!font-black !tracking-tight !text-brand-green',
      htmlContainer: '!text-zinc-600 dark:!text-zinc-400 !font-medium !mb-4',
      confirmButton: 'px-6 py-3.5 bg-red-600 text-white rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/20 cursor-pointer mx-2',
      cancelButton: 'px-6 py-3.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all border border-zinc-200 dark:border-zinc-800 cursor-pointer mx-2'
    },
    buttonsStyling: false
  });
  return result.isConfirmed;
};
