import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TelegramIcon from '@material-ui/icons/Telegram';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: { display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#383737", padding: "2rem 5rem" },
    footer_menu: { display: "flex", justifyContent: "space-between" },
    divider_menu: { color: "#767b81", display: "flex", justifyContent: "space-between" },
    title: { paddingLeft: '10px', fontSize: "19px", color: '#abb4be' },
    footer_link: { paddingLeft: '3px', display: "flex", flexDirection: "column", alignItems: "start" },
    footer_link_social: { display: "flex", flexDirection: "row", alignItems: "start", paddingTop: "1.6rem" },
    button: { color: "#767b81" },
    social: { fontSize: '3rem' },
    divider: { backgroundColor: 'rgb(235 227 227 / 82%)', margin: "2.5rem 0 2.5rem 0" }

}));
interface IFooter { }

const Footer: React.FC<IFooter> = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.footer_menu}>
                <div>
                    <div className={classes.title}>
                        О магазине
                    </div>
                    <div className={classes.footer_link}>
                        <Button className={classes.button} component={Link} to={'/'} >
                            О нас
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Контакты
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Магазины
                        </Button>
                    </div>
                </div>
                <div>
                    <div className={classes.title}>
                        Покупателям
                    </div>
                    <div className={classes.footer_link}>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Доставка
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Оплата
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Обратная связь
                        </Button>
                    </div>
                </div>
                <div>
                    <div className={classes.title}>
                        Активность
                    </div>
                    <div className={classes.footer_link}>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Новости
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            События
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            Партнеры
                        </Button>
                    </div>
                </div>
                <div>
                    <div className={classes.title}>
                        Мы в соц. сетях
                    </div>
                    <div className={classes.footer_link_social}>
                        <Button className={classes.button} component={Link} to={'/'} >
                            <InstagramIcon className={classes.social} />
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            <YouTubeIcon className={classes.social} />
                        </Button>
                        <Button className={classes.button} component={Link} to={'/'} >
                            <TelegramIcon className={classes.social} />
                        </Button>
                    </div>
                </div>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.divider_menu}>
                <div>
                    Политика конфиденциальности
                </div>
                <div>
                    Обработка персональных данных
                </div>
                <div>
                    Разработка сайта — Петросян Никита
                </div>
            </div >
        </div>
    );
};

export default Footer;