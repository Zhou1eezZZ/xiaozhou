const bindShow = status => {
  return status ? { opacity: 1 } : { width: 0, height: 0, opacity: 0 };
};
export default bindShow;
