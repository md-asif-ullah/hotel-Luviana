type ResponsePropsType = {
  status: number;
  success: boolean;
  message: string;
  payload?: any;
};

const successResponce = ({
  status = 200,
  success = true,
  message = "successfully",
  payload = [],
}: ResponsePropsType) => {
  return Response.json({
    status,
    success,
    message,
    payload,
  });
};

const errorResponce = ({
  status = 500,
  success = false,
  message = "error somthing went worn",
}: ResponsePropsType) => {
  return Response.json({
    status,
    success,
    message,
  });
};

export { successResponce, errorResponce };
