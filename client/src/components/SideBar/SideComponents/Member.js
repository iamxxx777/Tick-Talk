const Member = ({data}) => {
    return (
        <div className="channel-member">
            <img src={data.photo} alt={data.name} />
            <h3>{data.name}</h3>
        </div>
    )
}

export default Member
