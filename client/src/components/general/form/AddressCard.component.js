import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  CardTitle
} from "reactstrap";

const AddressCard = props => {
  const { register, errors, disabled, name, title } = props;

  return (
    <Card>
      <CardBody>
        {title !== undefined && <CardTitle>{title}</CardTitle>}
        <FormGroup>
          <Label for={`${name}.street`}>Address</Label>
          <Input
            type="text"
            name={`${name}.street`}
            innerRef={register({ required: true })}
            invalid={errors[`${name}.street`]}
            disabled={disabled != undefined ? disabled : false}
          />
          <FormFeedback>Input required</FormFeedback>
        </FormGroup>
        <Row form>
          <Col md={5}>
            <FormGroup>
              <Label for={`${name}.town`}>Town</Label>
              <Input
                type="text"
                name={`${name}.town`}
                innerRef={register({ required: true })}
                invalid={errors[`${name}.town`]}
                disabled={disabled != undefined ? disabled : false}
              />
              <FormFeedback>Input required</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for={`${name}.county`}>County</Label>
              <Input
                type="text"
                name={`${name}.county`}
                innerRef={register}
                disabled={disabled != undefined ? disabled : false}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for={`${name}.postcode`}>Postcode</Label>
              <Input
                type="text"
                name={`${name}.postcode`}
                innerRef={register({ required: true })}
                invalid={errors[`${name}.postcode`]}
                disabled={disabled != undefined ? disabled : false}
              />
              <FormFeedback>Input required</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AddressCard;
