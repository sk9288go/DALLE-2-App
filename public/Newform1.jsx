/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { AIprompt } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function NewForm1(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Obj: "",
    Field0: [],
    images: "",
    remove: undefined,
  };
  const [Obj, setObj] = React.useState(initialValues.Obj);
  const [Field0, setField0] = React.useState(initialValues.Field0);
  const [images, setImages] = React.useState(initialValues.images);
  const [remove, setRemove] = React.useState(initialValues.remove);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setObj(initialValues.Obj);
    setField0(initialValues.Field0);
    setCurrentField0Value("");
    setImages(initialValues.images);
    setRemove(initialValues.remove);
    setErrors({});
  };
  const [currentField0Value, setCurrentField0Value] = React.useState("");
  const Field0Ref = React.createRef();
  const validations = {
    Obj: [],
    Field0: [],
    images: [{ type: "URL" }],
    remove: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Obj,
          Field0,
          images,
          remove,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new AIprompt(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NewForm1")}
      {...rest}
    >
      <TextAreaField
        label="AI image Obj"
        descriptiveText="이미지의 주체가 되는 요소를 명사와 목적어 위주로 작성해주세요"
        isRequired={false}
        isReadOnly={false}
        placeholder="이미지의 주체가 되는 요소"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Obj: value,
              Field0,
              images,
              remove,
            };
            const result = onChange(modelFields);
            value = result?.Obj ?? value;
          }
          if (errors.Obj?.hasError) {
            runValidationTasks("Obj", value);
          }
          setObj(value);
        }}
        onBlur={() => runValidationTasks("Obj", Obj)}
        errorMessage={errors.Obj?.errorMessage}
        hasError={errors.Obj?.hasError}
        {...getOverrideProps(overrides, "Obj")}
      ></TextAreaField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              Obj,
              Field0: values,
              images,
              remove,
            };
            const result = onChange(modelFields);
            values = result?.Field0 ?? values;
          }
          setField0(values);
          setCurrentField0Value("");
        }}
        currentFieldValue={currentField0Value}
        label={"Styles"}
        items={Field0}
        hasError={errors.Field0?.hasError}
        setFieldValue={setCurrentField0Value}
        inputFieldRef={Field0Ref}
        defaultFieldValue={""}
      >
        <TextField
          label="Styles"
          descriptiveText="원하는 스타일을 지정해주세요"
          placeholder="원하는 스타일을 지정해주세요"
          value={currentField0Value}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Field0?.hasError) {
              runValidationTasks("Field0", value);
            }
            setCurrentField0Value(value);
          }}
          onBlur={() => runValidationTasks("Field0", currentField0Value)}
          errorMessage={errors.Field0?.errorMessage}
          hasError={errors.Field0?.hasError}
          ref={Field0Ref}
          labelHidden={true}
          {...getOverrideProps(overrides, "Field0")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Images"
        descriptiveText="첨부되는 이미지의 URL을 입력해주세요"
        isRequired={false}
        isReadOnly={false}
        placeholder="이미지 URL 지정"
        value={images}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Obj,
              Field0,
              images: value,
              remove,
            };
            const result = onChange(modelFields);
            value = result?.images ?? value;
          }
          if (errors.images?.hasError) {
            runValidationTasks("images", value);
          }
          setImages(value);
        }}
        onBlur={() => runValidationTasks("images", images)}
        errorMessage={errors.images?.errorMessage}
        hasError={errors.images?.hasError}
        {...getOverrideProps(overrides, "images")}
      ></TextField>
      <SelectField
        label="Sizes"
        descriptiveText="사이즈를 선택해주세요"
        placeholder="사이즈를 선택해주세요"
        value={remove}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Obj,
              Field0,
              images,
              remove: value,
            };
            const result = onChange(modelFields);
            value = result?.remove ?? value;
          }
          if (errors.remove?.hasError) {
            runValidationTasks("remove", value);
          }
          setRemove(value);
        }}
        onBlur={() => runValidationTasks("remove", remove)}
        errorMessage={errors.remove?.errorMessage}
        hasError={errors.remove?.hasError}
        {...getOverrideProps(overrides, "remove")}
      >
        <option
          children="small"
          value="small"
          {...getOverrideProps(overrides, "removeoption0")}
        ></option>
        <option
          children="medium"
          value="medium"
          {...getOverrideProps(overrides, "removeoption1")}
        ></option>
        <option
          children="large"
          value="large"
          {...getOverrideProps(overrides, "removeoption2")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}