import { createAction } from '@reduxjs/toolkit';

export const notifyToast = createAction('toast/Notify');
export const notifyErrorToast = createAction('toast/NotifyError');
