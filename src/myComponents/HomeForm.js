import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, InputNumber, DatePicker, Select, Button } from "antd";
import "antd/dist/reset.css";

const { TextArea } = Input;
const { Option } = Select;

export default function CustomerForm() {
  const validationSchema = Yup.object({
    customerName: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name required!"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone number required!"),
    clothingType: Yup.string().required("Please select clothing type"),
    chest: Yup.number().required("Please enter chest measurement"),
    waist: Yup.number().required("Please enter waist measurement"),
    length: Yup.number().required("Please enter length measurement"),
    deliveryDate: Yup.date().required("Please select delivery date"),
    notes: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        customerName: "",
        phoneNumber: "",
        clothingType: "",
        chest: "",
        waist: "",
        length: "",
        deliveryDate: "",
        notes: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Customer Details:", values);
        alert("Customer details added successfully!");
        localStorage.setItem("customerData", JSON.stringify(values)); 
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            fontFamily: "sans-serif",
          }}
        >
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            style={{
              width: "450px",
              padding: "30px",
              border: "2px solid #ddd",
              borderRadius: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Customer Details
            </h2>

            <Form.Item
              label="Customer Name"
              validateStatus={
                touched.customerName && errors.customerName ? "error" : ""
              }
              help={touched.customerName ? errors.customerName : ""}
            >
              <Input
                name="customerName"
                placeholder="name"
                value={values.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              validateStatus={
                touched.phoneNumber && errors.phoneNumber ? "error" : ""
              }
              help={touched.phoneNumber ? errors.phoneNumber : ""}
            >
              <Input
                name="phoneNumber"
                placeholder="03XXXXXXXXX"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item
              label="Clothing Type"
              validateStatus={
                touched.clothingType && errors.clothingType ? "error" : ""
              }
              help={touched.clothingType ? errors.clothingType : ""}
            >
              <Select
                name="clothingType"
                placeholder="Select clothing type"
                value={values.clothingType}
                onChange={(value) => setFieldValue("clothingType", value)}
              >
                <Option value="Shalwar Kameez">Shalwar Kameez</Option>
                <Option value="Suit">Suit</Option>
                <Option value="Kurta">Kurta</Option>
                <Option value="Waistcoat">Waistcoat</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Chest (inches)">
              <InputNumber
                name="chest"
                style={{ width: "100%" }}
                value={values.chest}
                onChange={(value) => setFieldValue("chest", value)}
              />
            </Form.Item>

            <Form.Item label="Waist (inches)">
              <InputNumber
                name="waist"
                style={{ width: "100%" }}
                value={values.waist}
                onChange={(value) => setFieldValue("waist", value)}
              />
            </Form.Item>

            <Form.Item label="Length (inches)">
              <InputNumber
                name="length"
                style={{ width: "100%" }}
                value={values.length}
                onChange={(value) => setFieldValue("length", value)}
              />
            </Form.Item>

            <Form.Item
              label="Delivery Date"
              validateStatus={
                touched.deliveryDate && errors.deliveryDate ? "error" : ""
              }
              help={touched.deliveryDate ? errors.deliveryDate : ""}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={values.deliveryDate}
                onChange={(date) => setFieldValue("deliveryDate", date)}
              />
            </Form.Item>

            <Form.Item label="Additional Notes">
              <TextArea
                name="notes"
                rows={3}
                placeholder="Any special instructions by the customer?"
                value={values.notes}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ borderRadius: "6px", fontWeight: "bold" }}
              >
                Add Customer
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
}
