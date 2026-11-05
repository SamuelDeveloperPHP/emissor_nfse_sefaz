import React from 'react';
import PrismCode from '../../../Components/Common/Prism';

//Checkbox
const Checkbox = () => {
const code =`<Col lg={4} md={6}>                                                    
<div>   
    <p className="text-muted fw-medium">Default Checkbox</p>
    <p className="text-muted">Use <code>type="checkbox"</code> attribute to set a checkbox and add <code>checked</code> 
        attribute to set a checkbox checked by default.</p>
    <div className="form-check mb-2">
        <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck1"/>
        <Form.Check.Label className="form-check-label" htmlFor="formCheck1">
            Default checkbox
        </Form.Check.Label>
    </div>                                                        
    <div className="form-check">
        <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck2" defaultChecked/>                                                           
        <Form.Check.Label className="form-check-label" htmlFor="formCheck2">
            Checked checkbox
        </Form.Check.Label>
    </div>
</div>
</Col>

<Col lg={4} md={6}> 
    <div className="mt-4 mt-md-0">
        <p className="text-muted fw-medium">Disabled Checkbox</p>
        <p className="text-muted">Use <code>disabled</code> attribute to set a checkbox disabled and add <code>checked</code> 
            attribute to set a checkbox checked by default.</p>
        <div>
            <div className="form-check form-check-right mb-2">
                <Form.Check.Input className="form-check-input" type="checkbox" value="" id="flexCheckDisabled"  disabled/>
                <Form.Check.Label className="form-check-label" htmlFor="flexCheckDisabled">
                    Disabled checkbox
                </Form.Check.Label>
            </div>
        </div>
        <div>
            <div className="form-check form-check-right">
                <Form.Check.Input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" defaultChecked disabled/>
                <Form.Check.Label className="form-check-label" htmlFor="flexCheckCheckedDisabled">
                    Disabled checked checkbox
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col>

<Col lg={4} md={6}> 
    <div className="mt-4 mt-md-0">
        <p className="text-muted fw-medium">Checkbox Right</p>
        <p className="text-muted">Use <code>form-check-right</code> class to form-check class to set a checkbox on the right side.</p>
        <div className="form-check form-check-right mb-2">
            <Form.Check.Input className="form-check-input" type="checkbox" name="formCheckboxRight" id="formCheckboxRight1" />
            <Form.Check.Label className="form-check-label" htmlFor="formCheckboxRight1">
                Form Radio Right
            </Form.Check.Label>
        </div>
        <div>
            <div className="form-check form-check-right">
                <Form.Check.Input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedRightDisabled" defaultChecked disabled/>
                <Form.Check.Label className="form-check-label" htmlFor="flexCheckCheckedRightDisabled">
                    Disabled checked checkbox
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col>

<Col lg={6}>
    <div className="mt-3">
        <p className="text-muted fw-medium">Indeterminate</p>
        <div>
            <div className="form-check">
                <Form.Check.Input className="form-check-input" type="checkbox" value="" id="defaultIndeterminateCheck"/>
                <Form.Check.Label className="form-check-label" htmlFor="defaultIndeterminateCheck">
                    Indeterminate checkbox
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col>
`;

    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Custom Checkbox
const CustomCheckbox = () => {
    const code = `<Col md={6}>
    <div>                                               
        <p className="text-muted">Use <code>form-check-</code> class with below-mentioned color variation to set a color checkbox.</p>                                                        
        <div>
            <div className="form-check mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck6" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck6">
                    Checkbox Primary
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-secondary mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck7" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck7">
                    Checkbox Secondary
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-success mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck8" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck8">
                    Checkbox Success
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-warning mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck9" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck9">
                    Checkbox Warning
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-danger mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck10" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck10">
                    Checkbox Danger
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-info mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck11" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck11">
                    Checkbox Info
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-dark">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck12" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck12">
                    Checkbox Dark
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col>

<Col md={6}>
    <div className="mt-4 mt-md-0">
        <p className="text-muted">Use <code>form-check-outline</code> class and <code>form-check-</code> class with below-mentioned color variation to set a color checkbox with outline.</p>
        
        <div>
            <div className="form-check form-check-outline form-check-primary mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck13" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck13">
                    Checkbox Outline Primary
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-outline form-check-secondary mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck14" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck14">
                    Checkbox Outline Secondary
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-outline form-check-success mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck15" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck15">
                    Checkbox Outline Success
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-outline form-check-warning mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck16" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck16">
                    Checkbox Outline Warning
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-outline form-check-danger mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck17" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck17">
                    Checkbox Outline Danger
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-outline form-check-info mb-3">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck18" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck18">
                    Checkbox Outline Info
                </Form.Check.Label>
            </div>
            <div className="form-check form-check-outline form-check-dark">
                <Form.Check.Input className="form-check-input" type="checkbox" id="formCheck19" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="formCheck19">
                    Checkbox Outline Dark
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col> 
`;

    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Radio
const Radio = () => {
    const code = `<Col lg={4} md={6}>
<div>
    <p className="text-muted fw-medium">Default Radios</p>
    <p className="text-muted">Use <code>type="radio"</code> attribute to set a radio button and add <code>defaultChecked</code> attribute to set a radio checked by default.</p>
    <div className="form-check mb-2">
        <Form.Check.Input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
        <Form.Check.Label className="form-check-label" htmlFor="flexRadioDefault1">
            Default radio
        </Form.Check.Label>
    </div>
    <div className="form-check">
        <Form.Check.Input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
        <Form.Check.Label className="form-check-label" htmlFor="flexRadioDefault2">
            Default checked radio
        </Form.Check.Label>
    </div>
</div>
</Col>
<Col lg={4} md={6}>
    <div className="mt-4 mt-md-0">
        <p className="text-muted fw-medium">Disabled Radios</p>
        <p className="text-muted">Use <code>disabled</code> attribute to set a radio button disabled and add <code>defaultChecked</code> attribute to set a radio checked by default.</p>
        <div className="form-check mb-2">
            <Form.Check.Input className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled />
            <Form.Check.Label className="form-check-label" htmlFor="flexRadioDisabled">
              Disabled radio
            </Form.Check.Label>
        </div>
        <div>
            <div className="form-check">
                <Form.Check.Input className="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" defaultChecked disabled />
                <Form.Check.Label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
                  Disabled checked radio
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col>

<Col lg={4} md={6}>
    <div className="mt-4 mt-md-0">
        <p className="text-muted fw-medium">Radio Right</p>
        <p className="text-muted">Use <code>form-check-right</code> class to form-check class to set a radio button on the right side.</p>
        <div className="form-check form-check-right mb-2">
            <Form.Check.Input className="form-check-input" type="radio" name="formradioRight" id="formradioRight1"/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight1">
                Form Radio Right
            </Form.Check.Label>
        </div>
        <div>
            <div className="form-check form-check-right">
                <Form.Check.Input className="form-check-input" type="radio" value="" name="formradioRight" id="flexCheckCheckedDisabled2" defaultChecked disabled/>
                <Form.Check.Label className="form-check-label" htmlFor="flexCheckCheckedDisabled2">
                    Disabled checked radio
                </Form.Check.Label>
            </div>
        </div>
    </div>
</Col>
`;

    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Custom Radio
const CustomRadio = () => {
    const code = `<Col md={6}>
<div>
<p className="text-muted">Use <code>form-check-</code> class with below-mentioned color variation to set a color radio.</p>

<div className="form-check form-radio-primary mb-3">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor1" id="formradioRight5" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight5">
        Radio Primary
    </Form.Check.Label>
</div>

<div className="form-check form-radio-secondary mb-3">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor2" id="formradioRight6" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight6">
        Radio Secondary
    </Form.Check.Label>
</div>

<div className="form-check form-radio-success mb-3">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor3" id="formradioRight7" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight7">
        Radio Success
    </Form.Check.Label>
</div>

<div className="form-check form-radio-warning mb-3">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor4" id="formradioRight8" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight8">
        Radio Warning
    </Form.Check.Label>
</div>

<div className="form-check form-radio-danger mb-3">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor5" id="formradioRight9" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight9">
        Radio Danger
    </Form.Check.Label>
</div>

<div className="form-check form-radio-info mb-3">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor6" id="formradioRight10" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight10">
        Radio Info
    </Form.Check.Label>
</div>

<div className="form-check form-radio-dark">
    <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor7" id="formradioRight11" defaultChecked/>
    <Form.Check.Label className="form-check-label" htmlFor="formradioRight11">
        Radio Dark
    </Form.Check.Label>
</div>
</div>
</Col>

<Col md={6}>
    <div className="mt-4 mt-md-0">
        <p className="text-muted">Use <code>form-check-outline</code> class and <code>form-check-</code> class with below-mentioned color variation to set a color radio with outline.</p>

        <div className="form-check form-radio-outline form-radio-primary mb-3">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor9" id="formradioRight13" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight13">
                Radio Outline Primary
            </Form.Check.Label>
        </div>

        <div className="form-check form-radio-outline form-radio-secondary mb-3">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor10" id="formradioRight14" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight14">
                Radio Outline Secondary
            </Form.Check.Label>
        </div>

        <div className="form-check form-radio-outline form-radio-success mb-3">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor11" id="formradioRight15" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight15">
                Radio Outline Success
            </Form.Check.Label>
        </div>

        <div className="form-check form-radio-outline form-radio-warning mb-3">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor12" id="formradioRight16" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight16">
                Radio Outline Warning
            </Form.Check.Label>
        </div>

        <div className="form-check form-radio-outline form-radio-danger mb-3">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor13" id="formradioRight17" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight17">
                Radio Outline Danger
            </Form.Check.Label>
        </div>

        <div className="form-check form-radio-outline form-radio-info mb-3">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor14" id="formradioRight18" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight18">
                Radio Outline Info
            </Form.Check.Label>
        </div>

        <div className="form-check form-radio-outline form-radio-dark">
            <Form.Check.Input className="form-check-input" type="radio" name="formradiocolor15" id="formradioRight19" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="formradioRight19">
                Radio Outline Dark
            </Form.Check.Label>
        </div>

    </div>
</Col>
`;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};
//Switches
const Switches = () => {
    const code = `<Col lg={4} md={6}>
<div>
    <p className="text-muted fw-medium">Default Switches</p>
    <p className="text-muted">Use <code>form-switch</code> class to form-check class to set a switch and add <code>defaultChecked</code> attribute to set a switch checked by default.</p>  
        <div className="form-check form-switch mb-2">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch input</Form.Check.Label>
        </div>

        <div className="form-check form-switch">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch input</Form.Check.Label>
        </div>
    </div>
</Col>

<Col lg={4} md={6}>
    <div className="mt-4 mt-md-0">
        <p className="text-muted fw-medium">Disabled Switches</p> 
        <p className="text-muted">Use <code>disabled</code> attribute to set a radio button disabled and add <code>defaultChecked</code> 
            attribute to set a switch checked by default.</p>
        <div className="form-check form-switch mb-2">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled/>
            <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckDisabled">Switch input</Form.Check.Label>
        </div>
        
        <div className="form-check form-switch">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled1" defaultChecked disabled/>
            <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckCheckedDisabled1">Disabled checked switch input</Form.Check.Label>
        </div>
    </div>
</Col>

<Col lg={4} md={6}>
    <div className="mt-4 mt-md-0">
        <p className="text-muted fw-medium">Switch Right</p>
        <p className="text-muted">Use <code>form-check-right</code> class to form-check class to set a switch button on the right side.</p>
        <div>
            <div className="form-check form-switch form-check-right mb-2">
                <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckRightDisabled" defaultChecked/>
                <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckRightDisabled">Switch Right input</Form.Check.Label>
            </div>
        </div>

        <div>
            <div className="form-check form-switch form-check-right">
                <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled2" disabled/>
                <Form.Check.Label className="form-check-label" htmlFor="flexSwitchCheckCheckedDisabled2">Disabled checked switch input</Form.Check.Label>
            </div>
        </div>
        
    </div>
</Col>

<Col lg={4} md={6}>
    <div className="mt-3">
        <p className="text-muted fw-medium">Switch sizes</p>
        <p className="text-muted">Use <code>form-switch-md</code> class to set a medium size switch button and
            <code>form-switch-lg</code> class to form-check class to set a large size switch button respectively.
            No such class is required for small size switch button.</p>

        <div className="form-check form-switch mb-3" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="customSwitchsizesm" defaultChecked=""/>
            <Form.Check.Label className="form-check-label" htmlFor="customSwitchsizesm">Small Size Switch</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-md mb-3" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="customSwitchsizemd"/>
            <Form.Check.Label className="form-check-label" htmlFor="customSwitchsizemd">Medium Size Switch</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-lg" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked=""/>
            <Form.Check.Label className="form-check-label" htmlFor="customSwitchsizelg">Large Size Switch</Form.Check.Label>
        </div>
    </div>
</Col>
`;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Switch Color
const SwitchColor = () => {
    const code = `<Col md={6}>
<div>
        <div className="form-check form-switch mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck1" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck1">Switch Default</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-secondary mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck2" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck2">Switch Secondary</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-success mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck3" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck3">Switch Success</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-warning mb-2 mb-md-0">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck4" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck4">Switch Warning</Form.Check.Label>
        </div>
    </div>
</Col>

<Col md={6}>
    <div>
        <div className="form-check form-switch form-switch-danger mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck5" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck5">Switch Danger</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-info mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck6" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck6">Switch Info</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-dark mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck7" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck7">Switch Dark</Form.Check.Label>
        </div>
    </div>
</Col>
    `;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Custom Switches
const CustomSwitches = () => {
    const code = `<Col md={6}>
<div>
        <div className="form-check form-switch form-switch-custom form-switch-primary mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck9" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck9">Switch Primary</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-custom form-switch-secondary mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck10" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck10">Switch Secondary</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-custom form-switch-success mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck11" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck11">Switch Success</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-custom form-switch-warning mb-2 mb-md-0">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck12" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck12">Switch Warning</Form.Check.Label>
        </div>
    </div>
</Col>

<Col md={6}>
    <div className="mt-4 mt-md-0">
        <div className="form-check form-switch form-switch-custom form-switch-danger mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck13" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck13">Switch Danger</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-custom form-switch-info mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck14" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck14">Switch Info</Form.Check.Label>
        </div>

        <div className="form-check form-switch form-switch-custom form-switch-dark mb-3">
            <Form.Check.Input className="form-check-input" type="checkbox" role="switch" id="SwitchCheck15" defaultChecked/>
            <Form.Check.Label className="form-check-label" htmlFor="SwitchCheck15">Switch Dark</Form.Check.Label>
        </div>
    </div>
</Col>
        `;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Inline Checkbox & Radio
const InlineCheckboxRadio = () => {
    const code = `<Col lg={4}>
<div className="mt-4 mt-lg-0">
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="option1"/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox6">1</Form.Check.Label>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="option2"/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox7">2</Form.Check.Label>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="option3" disabled/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineCheckbox8">3 (disabled)</Form.Check.Label>
        </div>
    </div>
</Col>

<Col lg={4}>
    <div className="mt-4 mt-lg-0">
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio1" value="option1"/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineRadio1">1</Form.Check.Label>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="option2"/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineRadio2">2</Form.Check.Label>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio3" value="option3" disabled/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineRadio3">3 (disabled)</Form.Check.Label>
        </div>
    </div>
</Col>

<Col lg={4}>
    <div className="mt-4 mt-lg-0">
        <div className="form-check form-switch form-check-inline" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="inlineswitch5"/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineswitch5">1</Form.Check.Label>
        </div>
        <div className="form-check form-switch form-check-inline" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="inlineswitch6"/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineswitch6">2</Form.Check.Label>
        </div>
        <div className="form-check form-switch form-check-inline" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="inlineswitchdisabled2" disabled/>
            <Form.Check.Label className="form-check-label" htmlFor="inlineswitchdisabled2">2</Form.Check.Label>
        </div>
    </div>
</Col>
`;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Without Labels
const WithoutLabels = () => {
    const code = `<Col lg={4}>
    <div className="mt-4 mt-lg-0">
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled/>
        </div>
    </div>
</Col>


<Col lg={4}>
    <div className="mt-4 mt-lg-0">
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id="WithoutinlineRadio1" value="option1"/>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id="WithoutinlineRadio2" value="option2"/>
        </div>
        <div className="form-check form-check-inline">
            <Form.Check.Input className="form-check-input" type="radio" name="inlineRadioOptions" id="WithoutinlineRadio3" value="option3" disabled/>
        </div>
    </div>
</Col>


<Col lg={4}>
    <div className="mt-4 mt-lg-0">
        <div className="form-check form-switch form-check-inline" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="inlineswitch"/>
        </div>
        <div className="form-check form-switch form-check-inline" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="inlineswitch1"/>
        </div>
        <div className="form-check form-switch form-check-inline" dir="ltr">
            <Form.Check.Input type="checkbox" className="form-check-input" id="inlineswitchdisabled" disabled/>
        </div>
    </div>
</Col>
`;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Radio Toggle Buttons
const RadioToggleButtons = () => {
    const code = `<div className="hstack gap-2 flex-wrap">
<Form.Check.Input type="radio" className="btn-check" name="options" id="option1" defaultChecked/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option1">Checked</Form.Check.Label>

<Form.Check.Input type="radio" className="btn-check" name="options" id="option2"/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option2">Radio</Form.Check.Label>

<Form.Check.Input type="radio" className="btn-check" name="options" id="option3" disabled/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option3">Disabled</Form.Check.Label>

<Form.Check.Input type="radio" className="btn-check" name="options" id="option4"/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option4">Radio</Form.Check.Label>
</div>
`;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

//Outlined Styles
const OutlinedStyles = () => {
    const code = `<div className="hstack gap-2 flex-wrap">
<Form.Check.Input type="radio" className="btn-check" name="options" id="option1" defaultChecked/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option1">Checked</Form.Check.Label>

<Form.Check.Input type="radio" className="btn-check" name="options" id="option2"/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option2">Radio</Form.Check.Label>

<Form.Check.Input type="radio" className="btn-check" name="options" id="option3" disabled/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option3">Disabled</Form.Check.Label>

<Form.Check.Input type="radio" className="btn-check" name="options" id="option4"/>
<Form.Check.Label className="btn btn-secondary" htmlFor="option4">Radio</Form.Check.Label>
</div>
`;
    return (
        <React.Fragment>
            <PrismCode
                code={code}
                 language={"html"}
            />
        </React.Fragment>
    );
};

export {
    Checkbox,
    CustomCheckbox,
    Radio,
    CustomRadio,
    Switches,
    SwitchColor,
    CustomSwitches,
    InlineCheckboxRadio,
    WithoutLabels,
    RadioToggleButtons,
    OutlinedStyles
};
