import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const { currentUser, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { professions } = useProfessions();
    const { qualities, getQuality } = useQualities();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professionsEdit, setProfession] = useState([]);
    const [qualitiesEdit, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const professionsList = professions.map((p) => ({
            label: p.name,
            value: p._id
        }));
        setProfession(professionsList);

        const qualitiesList = qualities.map((q) => ({
            value: q._id,
            label: q.name,
            color: q.color
        }));
        setQualities(qualitiesList);

        setData((prevState) => ({
            ...prevState,
            ...currentUser,
            qualities: transformData(currentUser.qualities),
            profession: currentUser.profession
        }));

        setIsLoading(true);
    }, []);

    const getQualities = (elements) => {
        const qualitiesArray = elements.map((q) => q.value);
        return qualitiesArray;
    };

    const transformData = (data) => {
        const qualitiesArray = [];
        for (const id of data) {
            const quality = [getQuality(id)];
            const qualTransform = quality.map((q) => ({
                value: q._id,
                label: q.name,
                color: q.color
            }));
            qualitiesArray.push(...qualTransform);
        }
        return qualitiesArray;
    };

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const userEdit = {
            ...data,
            qualities: getQualities(data.qualities)
        };
        updateUser(userEdit);
        history.push(`/users/${currentUser._id}`);
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!currentUser ? (
                        history.push(`/users/${currentUser._id}/edit`)
                    ) : !isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsEdit}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesEdit}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
