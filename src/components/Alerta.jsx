

const Alerta = ({alerta, color}) => {
    return (
        <div className={`${alerta.error ? 'from-red-500 to-red-600' : color ? 'from-green-400 to-green-800' :'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-5`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta