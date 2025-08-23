import styles from "./CardForm.module.scss";
import {useRef, useState} from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Button} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { type Card as CardType, type CardFromServer } from "../../types/card.ts"
import { type SelectChangeEvent } from '@mui/material/Select';

type CardFormProps = {
    onAddCard: (card: CardType) => void;
    editCard: (card: CardFromServer) => void;
    initialData?: any;
    isEditing?: boolean;
}

const CardForm = ({onAddCard, editCard, initialData, isEditing} : CardFormProps) => {
    const [step, setStep] = useState(1);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        // Первый шаг - общий для всех
        name: initialData?.name || '',
        description: initialData?.description || '',
        location: initialData?.location || '',
        category: initialData?.type ||'',
        photo: initialData?.image ||'',
        // Второй шаг - разный
        // Недвижимость тут надо поправить чтобы из initialData (получаем с сервера) ставить актуальное значение в поля
        propertyType: initialData?.propertyType || '',
        propertyArea: initialData?.area || 0,
        propertyRooms: initialData?.rooms || 0,
        propertyPrice: initialData?.price || 0,
        // Авто
        autoBrand: initialData?.brand || '',
        autoModel: initialData?.model || '',
        autoYear: initialData?.year|| 0,
        autoMileage: initialData?.mileage|| 0,
        // Услуги
        serviceType: initialData?.serviceType || '',
        serviceExperience: initialData?.experience || 0,
        servicePrice: initialData?.cost || 0,
        serviceWorkHours: initialData?.workSchedule || 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {

            // Создаем URL для превью
            const reader = new FileReader();
            reader.onload = () => {
                setFormData(prev => ({ ...prev, photo: reader.result as string }));
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({ ...prev, photo: '' }));
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Сбрасываем значение input
        }
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    return(
        <Box
            component="form"
            className={styles.formContainer}
        >
            {isEditing ? <h1>Редактирование объявления</h1> : <h1>Размещение нового объявления</h1>}
            {step === 1 && (
                <>
                <h2>Шаг {step}</h2>
            <FormControl>
                <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите название объявление"
                    label="Название"
                />
            </FormControl>
            <FormControl>
                <TextField
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Введите описание объявление"
                    label="Описание"
                />
            </FormControl>
            <FormControl>
                <TextField
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Введите локацию объявления"
                    label="Локация"
                />
            </FormControl>
            <FormControl className={styles.fileLoadContainer}>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddAPhotoIcon />}
                    className={styles.uploadImage}
                    onClick={handleUploadClick}
                >
                    Добавить фото
                </Button>
                {previewUrl && (
                    <Box sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                        mb: 2
                    }}>
                        <img
                            src={previewUrl}
                            alt="Превью"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 4
                            }}
                        />
                        <Button
                            size="small"
                            onClick={handleRemoveFile}
                            sx={{
                                position: 'absolute',
                                top: -10,
                                right: -10,
                                minWidth: 30,
                                minHeight: 30,
                                borderRadius: '50%',
                                bgcolor: 'black',
                                color: 'white',
                            }}
                        >
                            ×
                        </Button>
                    </Box>
                )}
            </FormControl>
            <FormControl>
                <InputLabel id="category">Категория</InputLabel>
                <Select
                    name="category"
                    value={formData.category}
                    onChange={handleSelectChange}
                >
                    <MenuItem value='Недвижимость'>Недвижимость</MenuItem>
                    <MenuItem value="Авто" >Авто</MenuItem>
                    <MenuItem value="Услуги">Услуги</MenuItem>
                </Select>
            </FormControl>
                </>)}
            {step === 2 && (
                <>
                    <h2>Шаг {step}</h2>
                    {formData.category === 'Недвижимость' && (
                        <>
                            <FormControl>
                                <InputLabel id="propertyType">Тип недвижимости</InputLabel>
                                <Select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value='Квартира'>Квартира</MenuItem>
                                    <MenuItem value="Дом" >Дом</MenuItem>
                                    <MenuItem value="Комната">Комната</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="propertyArea"
                                    value={formData.propertyArea}
                                    onChange={handleChange}
                                    placeholder="Введите площадь недвижимости"
                                    label="Площадь"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="propertyRooms"
                                    value={formData.propertyRooms}
                                    onChange={handleChange}
                                    placeholder="Введите количество комнат"
                                    label="Количество комнат"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="propertyPrice"
                                    value={formData.propertyPrice}
                                    onChange={handleChange}
                                    placeholder="Введите цену недвижимости"
                                    label="Цена"
                                />
                            </FormControl>
                        </>
                    )}


                    {formData.category === 'Авто' && (
                        <>
                            <FormControl>
                                <InputLabel id="autoBrand">Марка автомобиля</InputLabel>
                                <Select
                                    name="autoBrand"
                                    value={formData.autoBrand}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value='Mercedes'>Мерседес</MenuItem>
                                    <MenuItem value="BMW" >БМВ</MenuItem>
                                    <MenuItem value="lada">Жигули</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="autoModel"
                                    value={formData.autoModel}
                                    onChange={handleChange}
                                    placeholder="Введите модель автомобилия"
                                    label="Модель"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="autoYear"
                                    value={formData.autoYear}
                                    onChange={handleChange}
                                    placeholder="Введите год выпуска автомобилия"
                                    label="Год выпуска"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="autoMileage"
                                    value={formData.autoMileage}
                                    onChange={handleChange}
                                    placeholder="Введите пробег автомобилия"
                                    label="Пробег"
                                />
                            </FormControl>
                        </>
                    )}


                    {formData.category === 'Услуги' && (
                        <>
                            <FormControl>
                                <TextField
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    placeholder="Введите тип услуги"
                                    label="Тип услуги"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="serviceExperience"
                                    value={formData.serviceExperience}
                                    onChange={handleChange}
                                    placeholder="Опыт работы в годах"
                                    label="Опыт работы"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="servicePrice"
                                    value={formData.servicePrice}
                                    onChange={handleChange}
                                    placeholder="Стоимость услуги в рублях"
                                    label="Стоимость услуг"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    name="serviceWorkHours"
                                    value={formData.serviceWorkHours}
                                    onChange={handleChange}
                                    placeholder="Введите часы работы"
                                    label="Часы работы"
                                />
                            </FormControl>
                        </>
                    )}



                </>)}
            <FormControl className={styles.formButtonsContainer}>
                {step === 2 && (<Button variant="outlined" startIcon={<ArrowBackIosIcon />} className={styles.buttonPrev} onClick={handleBack}>
                    Назад
                </Button>)}
                {step === 1 && (<Button variant="contained" startIcon={<ArrowForwardIosIcon />} className={styles.buttonNext} onClick={()=>{
                    handleNext();
                }}>
                    Далее
                </Button>)}
                {step === 2 && (<Link to="/"><Button variant="contained" className={styles.buttonSubmit} onClick={()=>{
                    const formBase = {
                        name: formData.name,
                        description: formData.description,
                        location: formData.location,
                        image: formData.photo,
                    }

                    if (formData.category === 'Недвижимость') {
                        {isEditing ?
                            editCard({
                                id: initialData.id,
                                ...formBase,
                                type: 'Недвижимость',
                                propertyType: formData.propertyType,
                                area: Number(formData.propertyArea),
                                rooms: Number(formData.propertyRooms),
                                price: Number(formData.propertyPrice)
                            }) :
                            onAddCard({
                                ...formBase,
                                type: 'Недвижимость',
                                propertyType: formData.propertyType,
                                area: Number(formData.propertyArea),
                                rooms: Number(formData.propertyRooms),
                                price: Number(formData.propertyPrice)
                            })
                        }
                    }

                    if (formData.category === 'Авто') {
                        onAddCard({
                            ...formBase,
                            type: 'Авто',
                            brand: formData.autoBrand,
                            model: formData.autoModel,
                            year: formData.autoYear,
                            mileage: formData.autoMileage
                        })
                    }

                    if (formData.category === 'Услуги') {
                        onAddCard ({
                            ...formBase,
                            type: 'Услуги',
                            serviceType: formData.serviceType,
                            experience: Number(formData.serviceExperience),
                            cost: formData.servicePrice,
                            workSchedule: String(formData.serviceWorkHours)
                        })
                    }

                }}>
                        {isEditing ? 'Редактировать' : 'Редактировать'} объявление
                </Button></Link>)}
            </FormControl>
        </Box>

    )
}

export default CardForm;
