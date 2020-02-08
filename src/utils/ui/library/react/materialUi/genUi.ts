export function generateMaterial(feilds: any) {
  let importStatements: [String] = [""];
  let gencode = `<div>
  <AppBar position="static">
  <Toolbar variant="dense">
    <IconButton
      edge="start"
      
      color="inherit"
      aria-label="menu"
    >
    </IconButton>
    <Typography variant="h6" color="inherit">
      Photos
    </Typography>
  </Toolbar>
</AppBar>
<center>
  `;
  feilds.forEach((element: any) => {
    switch (element.type) {
      case "TextField": {
        let t = "";
        Object.keys(element.properties).forEach(pro => {
          t = t + `${pro}="${element.properties[pro]}"\n`;
        });
        gencode =
          gencode +
          `<TextField 
        ${t}
        />`;
        importStatements.push(
          "import TextField from '@material-ui/core/TextField';"
        );
        break;
      }
      case "Select": {
        let t = "";
        let opt = "";
        Object.keys(element.properties).forEach(pro => {
          if (pro === "options") {
            element.properties[pro].forEach(
              (option: { value: string; key: string; label: string }) => {
                opt =
                  opt +
                  `<MenuItem value="${option.value}" key="${option.key}" label="${option.label}">${option.value}</MenuItem>\n`;
              }
            );
          } else t = t + `${pro}="${element.properties[pro]}"\n`;
        });
        gencode =
          gencode +
          `<Select 
        ${t}>
        ${opt}
        </Select>`;
        importStatements.push("import Select from '@material-ui/core/Select';");
        importStatements.push(
          "import MenuItem from '@material-ui/core/MenuItem';"
        );
        break;
      }
      case "Button": {
        let t = "";
        Object.keys(element.properties).forEach(pro => {
          t = t + `${pro}="${element.properties[pro]}"\n`;
        });
        gencode =
          gencode +
          `<Button 
        ${t}
        />`;
        importStatements.push("import Button from '@material-ui/core/Button';");
        break;
      }
      case "Radio": {
        let opt = "";
        Object.keys(element.properties.options).forEach(o => {
          opt =
            opt +
            `<FormControlLabel value="${element.properties.options[o].value}" control={<Radio />} label="${element.properties.options[o].label}" />\n`;
        });
        let t = `
          <FormControl component="fieldset" >
          <FormLabel component="legend">${element.properties.label}</FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
           ${opt}           
          </RadioGroup>
        </FormControl>
          `;
        gencode = gencode + t;
        importStatements.push("import Radio from '@material-ui/core/Radio';");
        importStatements.push(
          "import FormControlLabel from '@material-ui/core/FormControlLabel';"
        );
        importStatements.push(
          "import FormControl from '@material-ui/core/FormControl';"
        );
        importStatements.push(
          "import RadioGroup from '@material-ui/core/RadioGroup';"
        );
        importStatements.push(
          "import FormLabel from '@material-ui/core/FormLabel';"
        );
        break;
      }
      case "Checkbox": {
        
        

        break;
      }
    }
  });
  gencode += "</center></div>";
  return { importStatements, gencode };
}
