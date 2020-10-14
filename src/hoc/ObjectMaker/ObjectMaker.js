const ObjectMaker = (elementType, elementConfig, value, validation, isValid, touched) => {
  return {
    elementType,
    elementConfig,
    value,
    validation,
    isValid,
    touched
  };
};

export default ObjectMaker;