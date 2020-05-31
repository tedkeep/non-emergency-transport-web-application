import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Col,
  ListGroup
} from "reactstrap";
import { getAllSkills } from "../../../redux/actions/skill.actions";

const SkillsCard = props => {
  const {
    register,
    errors,
    control,
    useFieldArray,
    disabled,
    getAllSkills,
    skills,
    loading
  } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  useEffect(() => {
    getAllSkills();
  }, []);

  return (
    <Card>
      <CardBody>
        <FormGroup row>
          <Col sm="10">
            <Label>Skills</Label>
          </Col>
          <Col sm="2">
            <Button
              onClick={() =>
                append({
                  skill: ""
                })
              }
              disabled={disabled != undefined ? disabled : false}
              outline
              color="secondary"
            >
              Add
            </Button>
          </Col>
        </FormGroup>
        {fields.length != 0 ? (
          <ListGroup>
            {fields.map((skill, index) => {
              return (
                <FormGroup row>
                  <Col sm="10">
                    <Label for={`unavailable[${index}].date`}>Start time</Label>
                    <Input
                      type="select"
                      name={`skills[${index}].skill`}
                      innerRef={register({ required: true })}
                      invalid={errors.date}
                      disabled={disabled != undefined ? disabled : false}
                    >
                      {!loading
                        ? skills.map((skill, index) => {
                            return (
                              <option value={skill._id}>{skill.skill}</option>
                            );
                          })
                        : ""}
                    </Input>
                    <FormFeedback>Input required</FormFeedback>
                  </Col>
                  <Col sm="2">
                    <Button
                      size="sm"
                      className="shiftRemove"
                      outline
                      color="danger"
                      onClick={() => remove(index)}
                      disabled={disabled != undefined ? disabled : false}
                    >
                      X
                    </Button>
                  </Col>
                </FormGroup>
              );
            })}
          </ListGroup>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => ({
  skills: state.skill.skills,
  loading: state.skill.loading
});

export default connect(mapStateToProps, { getAllSkills })(SkillsCard);
