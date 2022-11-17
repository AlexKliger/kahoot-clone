import { useCallback } from "react"

const NUMBER = {
    INTEGER: 'integer',
    DECIMAL: 'decimal',
    FRACTION: 'fraction'
}

function configNumToStr(config) {
    let string = config.sign === 'positive' ? '' : '-'
    switch (config.type) {
        case NUMBER.INTEGER:
            return `${string + Array(config.digits).fill('d').join('')}`
        case NUMBER.DECIMAL:
            return `${string + Array(config.digits - config.decimalPlaces).fill('d').join('')}.${Array(config.decimalPlaces).fill('d').join('')}`
        case NUMBER.FRACTION:
            return `${string + Array(config.digitsInNum).fill('d').join('') + '/' + Array(config.digitsInDen).fill('d').join('')}`
    }
}

const ConfigList = ({ configs, setConfigs }) => {
    const removeConfig = useCallback((index) => {
        configs.splice(index, 1)
        setConfigs([...configs])
    }, [configs, setConfigs])

    return (
        <ul className="config-list margin-centered">
            {configs.map((config, key) => (
                <li
                    key={key}
                >
                    <span>{configNumToStr(config.left)} {config.operator.type} {configNumToStr(config.right)}</span>
                    <i
                        className="fas fa-minus"
                        onClick={() => removeConfig(key)}
                    ></i>
                </li>
            ))}
        </ul>
    )
}

export default ConfigList