import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";

const AddCommentsForm = ({ onSubmit }) => {
    const [data, setData] = useState({ userId: "", content: "" });
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const clearForm = () => {
        setData({ userId: "", content: "" });
    };

    const arrayForSelect =
        users &&
        Object.keys(users).map((user) => ({
            label: users[user].name,
            value: users[user]._id
        }));

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Нужно выбрать User"
            }
        },
        content: {
            isRequired: {
                message: "Обязательно для заполнения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    defaultOption={"Выберите пользователя"}
                    options={arrayForSelect}
                    error={errors.userId}
                    name={"userId"}
                />
                <TextAreaField
                    label="Ваш комментарий"
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <button className="btn btn-primary">Опубликовать</button>
            </form>
        </div>
    );
};
AddCommentsForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentsForm;
