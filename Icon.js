import React from 'react'

function Icon(props){

    return(
        <div className = 'icons'>
            {props.datas === 'Sunny' && (
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/4005/4005793.png'
                        alt='Sunny Icon'
                    />
                )}
            {(props.datas === 'Mostly sunny' || props.datas === 'Partly sunny' || props.datas === 'Intermittent clouds' || props.datas === 'Hazy sunshine') && (
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/2108/2108730.png'
                        alt='Sunny-Cloudy Icon'
                    />
                )}
            {(props.datas === 'Mostly cloudy' || props.datas === 'Cloudy' || props.datas === 'Dreary' || props.datas === 'Fog') && (
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/7084/7084486.png'
                        alt='Cloudy Icon'
                    />
                )}
            {(props.datas === 'Showers' || props.datas === 'Mostly cloudy w/ showers' || props.datas === 'Partly sunny w/ showers' || props.datas === 'T-storms'|| props.datas === 'Mostly cloudy w/ t-storms' || props.datas === 'Mostly sunny w/ t-storms' || props.datas === 'Rain' || props.datas === 'Partly cloudy w/ showers' || props.datas === 'Partly cloudy w/ t-storms') && (
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/4724/4724091.png'
                        alt='Rain Icon'
                    />
                )}
            {(props.datas === 'Flurries' || props.datas === 'Mostly cloudy w/ flurries' || props.datas === 'Partly sunny w/ flurries' || props.datas === 'Ice'|| props.datas === 'Sleet' || props.datas === 'Freezing rain' || props.datas === 'Rain and snow' || props.datas === 'Mostly cloudy w/ snow') && (
                <img
                    src='https://cdn-icons-png.flaticon.com/512/6363/6363166.png'
                    alt='Snow Icon'
                />
            )}
            {(props.datas === 'Hot' ) && (
                <img
                    src='https://cdn-icons-png.flaticon.com/512/1684/1684375.png'
                    alt='Hot Icon'
                />
            )}
            {(props.datas === 'Cold' ) && (
                <img
                    src='https://cdn-icons-png.flaticon.com/512/1684/1684425.png'
                    alt='Cold Icon'
                />
            )}
            {(props.datas === 'Windy' ) && (
                <img
                    src='https://cdn-icons-png.flaticon.com/512/3104/3104631.png'
                    alt='Windy Icon'
                />
            )}
            {(props.datas === 'Clear' || props.datas === 'Mostly clear' || props.datas === 'Partly cloudy' || props.datas === 'Hazy moonlight' || props.datas === 'Freezing rain' || props.datas === 'Rain and snow') && (
                <img
                    src='https://cdn-icons-png.flaticon.com/512/180/180700.png'
                    alt='Moon Icon'
                />
            )}
        </div>
    )
}

export default Icon