import React, { memo } from 'react'
import RefreshIcon from '../../../assets/img/refresh.svg'
import {Card, Typography, Button, Select, MenuItem } from '../../../components'
import { CardPanelContentStyled, ItemStyled } from './style'
import Countries from '../../../commons/constants/Countries'

const navigatorHasShare =navigator.share
function Panel({ updateAt, onChange, data, country, getCoviddata }) {
        const { cases, recovered, deaths, todayCases, todayDeaths } = data
        
        const renderCountries = (country,index) => (
            <MenuItem key={`country-${index}`} value={country.value}>
                <ItemStyled>
                    <div>{country.label}</div>
                    <img src={country.flag} alt={`Páis-${country.label}`} />
                </ItemStyled>
            </MenuItem>
        )

const textCovid19 = `País: ${country} - recuperados: ${recovered}`

const copyInfo = () => {
    navigator.clipboard.writeText(textCovid19)
}
const shareInfo = () => {
    navigator.share({
        title:`Dados do Covid19 - ${country}`,
        text: textCovid19,
        url: 'https://covid19dio.netlify.app/'
    })
}
const renderShareButton = (
    <div>
    <Button variant="contained" color="primary" onClick={shareInfo}>
        Compartilhar
    </Button>
    </div>
)
const renderCopyButton = (
    <div>
        <Button variant="contained" color="primary" onClick={copyInfo}>
            Copiar
        </Button>
    </div>
)
return (
    <Card>
        <CardPanelContentStyled>
            <div>
                <Typography variant="h5" component="span" color="primary"> COVID-19 </Typography>
                <Typography variant="h6" component="span" color="primary"> Painel COVID-19 </Typography>
                <Typography variant="body2" component="span" color="primary"> Atualizado em: {updateAt}</Typography>
                <div className="pt-2">
                    <Select onChange={onChange} value={country}>
                        {Countries.map(renderCountries)}
                    </Select>
                </div>
            </div>
            {navigatorHasShare ? renderShareButton : renderCopyButton}    
        </CardPanelContentStyled>
    </Card>
)
}
export default memo(Panel)