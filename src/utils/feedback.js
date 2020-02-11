import { toast } from "react-toastify";

const TYPE = {
  DEFAULT: toast.TYPE.DEFAULT,
  SUCCESS: toast.TYPE.SUCCESS,
  INFO: toast.TYPE.INFO,
  WARNING: toast.TYPE.WARNING,
  ERROR: toast.TYPE.ERROR
};

const form = function(content, type) {
  call(content, { type });
};

const register = function(content, type) {
  type = type || TYPE.SUCCESS;
  content = content || "🎉 Congrats! You're registred.";

  call(content, {
    type,
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false
  });
};

const login = function(content, type) {
  type = type || TYPE.SUCCESS;
  content = content || "👋 Welcome back!";

  call(content, {
    type,
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false
  });
};

const call = function(content, options) {
  toast(content, options);
};

export default { TYPE, form, register, login };
