import * as React from 'react'
import '../pages/style.css'

interface FooterProps {
    homeFunc: () => void
}

const Footer = (props: FooterProps) => {
    return (
        <div className="footer">
            <div className="copyright">© <div onClick={props.homeFunc} ><img id="copyright-logo" src={'/images/logo.png'} alt="" />pro nsk</div>, 2011. Материалы сайта защищены авторским правом. При копировании обратная ссылка обязательна.</div>
            <div className="social">
                <a href="https://instagram.com/pro.nsk"><img className="in" src={'/images/instagram.svg'} alt="" /></a>
                <a href="https://twitter.com/pro_nsk"><img className="tw" src={'/images/twitter_mono.svg'} alt="" /></a>
                <a href="https://t.me/motors"><img className="tg" src={'/images/telegram.svg'} alt="" /></a>
            </div>
        </div>
    )
}

export default Footer