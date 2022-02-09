import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useForm, Controller } from "react-hook-form";
import { IProduct } from '../models/IProduct';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'rub',
        label: 'RUB',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
interface INew {

}
const New: React.FC<INew> = () => {
    const navigate = useNavigate();
    const { id } = useParams()

    const { control, handleSubmit, reset } = useForm({
        defaultValues:
        {
            name: '',
            price: 0,
            currency: 'rub',
            amount: 1,
            description: '',
            fullDescription: '',
            image: '/images/defaultImage.png'
        }
    });

    const [productById, setProductById] = React.useState<IProduct>()
    const getProductById: any = async () => {
        const response = await axios.get(`http://localhost:3300/api/product/getOne`, { params: { id } })
        return response.data
    }
    React.useEffect(() => {
        if (id) {
            (async () => {
                const product = await getProductById()
                setProductById(product)
            })()
        }
    }, [id])

    React.useEffect(() => {
        if (productById) {
            reset(productById)
        }
    }, [productById])

    const urlDefault = 'http://localhost:3300/images/defaultImage.png'
    const [image, setImage] = React.useState<string | null>(null)
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        const reader = new FileReader();
        if (file) {
            setImage(URL.createObjectURL(file[0]))
        }
    }

    const onSubmit = async (data: IProduct) => {
        data.image = image || urlDefault
        if (id) {
            let response = await axios.put('http://localhost:3300/api/product/edit', data);
        } else {
            let response = await axios.post('http://localhost:3300/api/product/create', data);
        }
        navigate('/admin/catalog/list')
    };
    const classes = useStyles();

    return <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off">
            <div>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField label="Название" type="text"  {...field} />}
                />
                <div className='d-flex'>
                    <Controller
                        name="currency"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                select
                                label="Валюта"
                                helperText="Выберите валюту"
                                {...field}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }

                    />
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => <TextField label="Цена" type="number"  {...field} />}
                    />
                </div>
                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => <TextField label="Количество" type="number"  {...field} InputLabelProps={{
                        shrink: true,
                    }} />}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <TextField label="Описание" type="text"  {...field} />}
                />
                <Controller
                    name="fullDescription"
                    control={control}
                    render={({ field }) => <TextField label="Полное описание" type="text"  {...field} />}
                />
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) =>
                        <>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(event) => handleUpload(event)} />
                            <img src={image || urlDefault} />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </>}

                />
            </div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type='submit'
            >
                Сохранить
            </Button>
        </form>
    </>
}

export default New