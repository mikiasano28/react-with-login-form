import React, { useEffect, useState, useReducer } from 'react';

import Card from './Card';
import Input from './input';
import classes from './Login.module.css';
import Button from './Button';

// reduceer function はコンポーネントの外に書く！
// ========= reducer function ============
const emailReducer = (state, action) => {
  if(action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if(action.type === "INPUT_BLUR") {
    // state.value -> latest snapshot from React 
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
}

const passwordReducer = (state, action) => {
  if(action.type === "USER_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: "", isValid: false }
}


// ========= Component ==========
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });
  

  // cleanup function がどの箇所で発火されるのかちゃんと理解しないといけない
  useEffect(() => {
    console.log("EFFECT RUNNIG");

    return () => {
      console.log("EFFECT CLEAN UP");
    }
  }, []);

  // =========== to set alias object to prevent from displaying console again and again, it just needss one time after email and password is valid 
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking from validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEAN UP");
      clearTimeout(identifier);
    }
  }, [emailIsValid, passwordIsValid])



  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value })

    // ======= もう一回考える！なぜここにevent.target.valueなのか ==========
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_PASSWORD", val: event.target.value })

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "PASSWORD_BLUR" })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email" 
          label="E-Mail" 
          type="email" 
          isValid={emailIsValid} 
          value={emailState.value}
          onChange={emailChangeHandler} 
          onBlur={validateEmailHandler}
        />
        <Input 
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;