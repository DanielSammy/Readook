import  React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function searchBook (){
  <React.Fragment>
  <Card.Title style={{margin: 2, padding: 3, background: '#fff',border: 'solid', borderRadius: 3}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Image {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}
  />
  <Card.Title style={{margin: 2, padding: 5, background: '#fff',border: 'solid', borderRadius: 5}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Image {...props} icon="" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}
  />
  <Card.Title style={{margin: 2, padding: 5, background: '#fff',border: 'solid', borderRadius: 5}}
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Image {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="currency-eth" onPress={() => {}} />}
  />
  </React.Fragment>
};