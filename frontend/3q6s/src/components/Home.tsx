import { Field, Formik, Form, FieldArray } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { QandA, Rating, Section, valuesInterface } from '../types';
import { DatePickerField, RatingOption, SelectField, TextField } from '../FormField';

const ratingOptions: RatingOption[] = [
    {value: Rating.n_a,   label: "N/A"},
    {value: Rating.zero,  label: "0"},
    {value: Rating.one,   label: "1"},
    {value: Rating.two,   label: "2"},
    {value: Rating.three, label: "3"},
    {value: Rating.four,  label: "4"},
    {value: Rating.five,  label: "5"},
  ]
  
interface SectionProps {
    questions: QandA[],
    header: string,
    index: number
}

const SectionDOM: React.FC<SectionProps> = ( {questions, header, index} ) => {
// console.log("SectionDOM", questions[header as unknown as number])
    return (
        <div key={header}>
            {questions.map((question:QandA, i: number) => {
            // console.log("q=", question.id+"comment")
            return(
                <div key={question.id+"div"}>
                <SelectField key={question.id} label={question.question} 
                    name={"questions["+index+"].questions["+i+"].answer"} options={ratingOptions}/>
                <Field key={question.id+"comment"} name={"questions["+index+"].questions["+i+"].comment"} 
                    component={TextField} />
                </div>
            )
            })}
        </div>
    )
}

interface HomeProps {
    errorMessage: string;
    onSubmit: (values: valuesInterface) => void;
    questions: Section[];
}

const Home: React.FC<HomeProps> = ({questions, onSubmit, errorMessage}) => {
    if (errorMessage != "")
        return (
            <div>
            <div>Error communicating with Server</div>
            <div>{errorMessage}</div>
            </div>
        )
    else {
    return (
        <div className="Questions">
            <h1>Departmental Internal Self Audit</h1>
            <Formik enableReinitialize={true}
                initialValues={{ area: "", auditor: "", date: new Date(), questions: {...questions} }}
                onSubmit={(values) => onSubmit(values)}
                validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.area)     errors.area     = requiredError;
                if (!values.auditor)  errors.auditor  = requiredError;
                if (!values.date)     errors.date     = requiredError;
                return errors;
                }}
            >
            {({ isValid, dirty, values, setFieldValue }) => {
                // console.log("app=>values", values)
                // console.log("app->sections", Sections2)
                return (
                    <Form className="form-ui">
                        <div className="header">
                            <Field  label="Area"   name="area"    component={TextField}    placeholder="Area"         />
                            <Field label="Auditor" name="auditor" component={TextField}    placeholder="Your Name"    />
                            <div id="dates" className='dates-class'>
                                <Field label="Date"    name="date"    component={DatePickerField} id="dates"
                                onChange={(val:Date) => {setFieldValue("date", val);} }/>
                            </div>
                        </div>
                        {(Object.keys(values.questions).length !== 0) && 
                            <FieldArray name="questions">
                            {() => questions.map((section: Section, index: number) => {
                                // console.log("values.questions", values.questions[key as unknown as number])
                                return (
                                    <fieldset key={section.header}>
                                        <h2>{section.header}</h2>
                                        <SectionDOM key={section.header+"section"} questions={section.questions} header={section.header} index={index} />
                                    </fieldset>
                                )
                            })}
                            </FieldArray>
                        }
                        <div className="buttons">
                            <Grid columns='equal'>
                                <Grid.Column floated="left">
                                    <Button type="button"  color="red">Cancel</Button>
                                    <Button type="submit" float="right" color="green" disabled={!dirty || !isValid}>Submit</Button>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Form>
                );
            }}
            </Formik>
        </div>
    )}
}

export default Home