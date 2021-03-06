import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Title, Ico, SimpleRow, SimpleColumn } from "../components/dashboard/DashboardContent/dashboardContent";
import CancelIco from "../assets/cancelIco.svg";
import { Marginer } from "../components/Marginer";
import { FormControlLabel, Radio } from "@material-ui/core";
import { Formik, useField } from "formik";
export const Backdrop = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  width: 2000px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  border: 10px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const DialogContainer = styled.div`
  width: ${(props) => props.width || "850px"};
  height: ${(props) => props.height || "630px"};
  border-radius: 20px;
  padding: 25px;
  background-color: #fff;
`;
const Form = styled.form`
  padding: 5px;
`;
const Label = styled.label`
  align-self: flex-start;
  font-size: 1.2rem;
  text-align: left;
  font-weight: 500;
  margin-bottom: 8px;
  ${(props) => (props.required == "required" ? "color: #F4442E" : "")};
`;
const Input = styled.input`
  height: ${(props) => props.height};
  padding: 10px 0px 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #f8f8f8;
  border: 2px solid #f8f8f8;
  transition: all 200ms ease-in-out;
  width: ${(props) => props.width || "auto"};
  color: #fa2003;
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
  &:focus {
    border: 2px solid #f4442e;
    background-color: rgba(244, 68, 46, 0.1);
  }
  ::placeholder {
    color: #800f00;
  }
`;

const TextArea = styled.textarea`
  font-family: Rubik;
  resize: none;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  padding: 10px 10px 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 20px;
  outline: none;
  background-color: #f8f8f8;
  border: 2px solid #f8f8f8;
  transition: all 200ms ease-in-out;
  color: #fa2003;
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
  &:focus {
    border: 2px solid #f4442e;
    background-color: rgba(244, 68, 46, 0.1);
  }
  ::placeholder {
    color: #800f00;
  }
`;

const InputContainer = styled.div`
  padding: 10px 10px 10px 5px;
  border: 5px solid #f8f8f8;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 10px 10px 20px 20px;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;
const InputMaker = ({
  ariaLabel,
  value,
  onChange,
  onBlur,
  width,
  required,
  label,
  Name,
  id,
  placeholder,
  type = "text",
  testId,
}) => {
  return (
    <InputContainer>
      <Label required={required} htmlFor={id}>
        {label}
      </Label>
      <Input
        data-testid={testId}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        width={width}
        required={required}
        name={Name}
        id={id}
        type={type}
        placeholder={placeholder}
      ></Input>
    </InputContainer>
  );
};

const Button = styled(motion.button)`
  color: #fff;
  font-size: 1.4rem;
  width: 300px;
  padding: 10px;
  border-radius: 20px;
  outline: none;
  border: none;
  cursor: ${(props) => (props.disabled === true ? "not-allowed" : "pointer")};
  background-color: ${(props) => (props.disabled === true ? "#f38f81" : "#bb1600")};
  transition: background-color 100ms ease-in-out;
`;

const RadioComponent = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const types = ["Food", "Object", "Other"];
export const PostModalMocked = ({ showPostModal, setShowPostModal, currentUser }) => {
  const handleSubmit = () => {};
  return (
    <>
      {showPostModal && (
        <AnimatePresence>
          <Backdrop variants={backdrop} initial="hidden" animate="visible" exit="hidden">
            <DialogContainer>
              <SimpleRow>
                <Title>Post a delivery</Title>
                <Ico
                  data-testid="cancelIco"
                  initial={{ scale: 1 }}
                  whileHover={{
                    rotate: -180,
                    scale: 0.95,
                    borderRadius: "10px",
                    boxShadow: "0px 0px 20px rgba(244, 68, 46, 0.2)",
                    backgroundColor: "rgba(244, 68, 46, 0.1)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileTap={{ scale: 1.4 }}
                  image={CancelIco}
                  onClick={() => setShowPostModal(false)}
                  hoverP
                  width="35px"
                  height="35px"
                ></Ico>
              </SimpleRow>
              <Marginer direction="vertical" margin={30}></Marginer>

              <Formik
                initialValues={{
                  title: "",
                  city: "",
                  address: "",
                  description: "",
                  typeOfOffer: "",
                  offeredBy: `${currentUser.email}`,
                  status: "Available",
                  takenBy: "",
                }}
                onSubmit={async (data, { setSubmitting }) => {
                  setSubmitting(true);
                  handleSubmit();
                  console.log("data submitted: ", data);
                  setSubmitting(false);
                  setShowPostModal(false);
                }}
              >
                {({ values, handleBlur, handleSubmit, handleChange, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <SimpleColumn>
                      <SimpleRow width="100%" justifyContent={"space-between"} alignItems={"center"}>
                        <InputMaker
                          ariaLabel="Title"
                          id="title"
                          testId="titleInput"
                          width="100%"
                          required="required"
                          label="Title *"
                          name={"Title"}
                          placeholder={"Offer Title i.e. Tomatoes"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title}
                        ></InputMaker>

                        <InputMaker
                          ariaLabel="City"
                          id="city"
                          testId="cityInput"
                          required="required"
                          label="City *"
                          name={"City"}
                          width="100%"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={"City or Town"}
                          value={values.city}
                        ></InputMaker>
                      </SimpleRow>
                      <Marginer direction="vertical" margin={20}></Marginer>

                      <SimpleRow width="100%" justifyContent={"space-between"} alignItems={"center"}>
                        <InputMaker
                          ariaLabel="Address"
                          width="100%"
                          id="address"
                          testId="addressInput"
                          required="required"
                          label="Address *"
                          name={"address"}
                          placeholder={"Address where is going to be delivered"}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                        ></InputMaker>
                        <InputContainer>
                          <Label>What type of offer is it?</Label>
                          <SimpleRow>
                            {types.map((elem) => {
                              return (
                                <RadioComponent
                                  aria-label="Type of offer"
                                  key={elem}
                                  name="typeOfOffer"
                                  type="radio"
                                  value={elem}
                                  label={elem}
                                ></RadioComponent>
                              );
                            })}
                          </SimpleRow>
                        </InputContainer>
                      </SimpleRow>
                      <Marginer direction="vertical" margin={20}></Marginer>

                      <SimpleRow alignItems="center" justifyContent="center" width="100%">
                        <InputContainer>
                          <Label htmlFor="description">Description</Label>
                          <TextArea
                            aria-label="Item description"
                            maxLength="500"
                            id="description"
                            data-testid="descriptionInput"
                            height="120px"
                            width="100%"
                            placeholder="Provide a description of your offer"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                          ></TextArea>
                        </InputContainer>
                      </SimpleRow>
                    </SimpleColumn>
                    <Marginer direction="vertical" margin={15}></Marginer>
                    <SimpleRow justifyContent="flex-end">
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        whileHover={{ scale: 1.05, transition: 1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSubmitting ? "Posting..." : "Post!"}
                      </Button>
                    </SimpleRow>
                  </Form>
                )}
              </Formik>
            </DialogContainer>
          </Backdrop>
        </AnimatePresence>
      )}
    </>
  );
};
