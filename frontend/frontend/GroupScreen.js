import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';

const sampleEvents = [
  { id: 'e1', title: 'Music Fest @ 6 PM', votes: { yes: 2, no: 1 } },
  { id: 'e2', title: 'Comedy Show @ 8 PM', votes: { yes: 1, no: 2 } },
];

export default function GroupScreen() {
  const [events, setEvents] = useState(sampleEvents);
  const [chat, setChat] = useState(['Aditi: I prefer the music fest!', 'Raj: Same here.']);
  const [message, setMessage] = useState('');

  const onVote = (id, option) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === id ? { ...ev, votes: { ...ev.votes, [option]: ev.votes[option] + 1 } } : ev
      )
    );
  };

  const sendMessage = () => {
    if (!message) return;
    setChat(prev => [...prev, `You: ${message}`]);
    setMessage('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Group: Weekend Plans</Text>

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, marginTop: 10, borderWidth: 1, borderRadius: 8 }}>
            <Text>{item.title}</Text>
            <Text>Yes: {item.votes.yes}   No: {item.votes.no}</Text>
            <TouchableOpacity onPress={() => onVote(item.id, 'yes')}>
              <Text>Vote Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onVote(item.id, 'no')}>
              <Text>Vote No</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={{ marginTop: 20, fontWeight: '600' }}>Chat</Text>
      {chat.map((c, i) => (
        <Text key={i}>{c}</Text>
      ))}

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type..."
          style={{ flex: 1, borderWidth: 1, padding: 8 }}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
