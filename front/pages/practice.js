import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup() {
    const [value, setValue] = React.useState(false);

    const handleChange = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value={true} control={<Radio />} label="Female" />
                <FormControlLabel value={false} control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
}