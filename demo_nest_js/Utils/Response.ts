export const response = {
  success: (data: any) => {
    let status = 200;
    if (data) {
      return {
        status,
        data,
      };
    } else {
      return {
        status,
        data: 'success',
      };
    }
  },
};
