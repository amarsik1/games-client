const PlayerItem = ({ player }) => {
  const {
    uuid,
    username,
    avatar,
  } = player;

  return (
    <div key={uuid}>
      <img src={avatar} alt="asdasd" style={{ width: 300 }} />
      <p>{username}</p>
    </div>
  );
};

export default PlayerItem;
