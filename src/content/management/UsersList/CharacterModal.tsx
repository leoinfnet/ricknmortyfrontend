import { styled } from '@mui/material';

const ModalOverlay = styled("div")`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
const ModalContainer = styled('div')`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ModalHeader = styled('div')`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
`;
const ModalImage = styled('img')`
    width: 150px;
    height: 150px;
    border-radius: 10px;
    margin-bottom: 20px;
`;
const InfoGroup = styled('span')`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const InfoLabel= styled('span')`   
    font-weight: bold;
    color: #333;
`;
const InfoValue = styled('span')`
    color: #666
`;
const CloseButton= styled('button')`
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: rgba(255, 79, 26, 0.49);
    }
`;

const CharacterModal = ({personagem, onClose}) =>{
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{personagem.name} | ID: {personagem.id}</ModalHeader>
        <ModalImage src={personagem.image} alt={personagem.name}></ModalImage>

        <InfoGroup>
          <InfoLabel>Nome:</InfoLabel>
          <InfoValue>{personagem.name}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Espécie:</InfoLabel>
          <InfoValue>{personagem.species}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Gênero:</InfoLabel>
          <InfoValue>{personagem.gender}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Status:</InfoLabel>
          <InfoValue>{personagem.status}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Localização:</InfoLabel>
          <InfoValue>{personagem.location}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Origem:</InfoLabel>
          <InfoValue>{personagem.origin}</InfoValue>
        </InfoGroup>
        <InfoGroup>
          <InfoLabel>Episode Count:</InfoLabel>
          <InfoValue>{personagem.episodeCount}</InfoValue>
        </InfoGroup>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  )
}
export default CharacterModal;