import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GiftedChat, Bubble, Composer, IMessage} from 'react-native-gifted-chat';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {moderateScale, scale} from 'react-native-size-matters';
import Icon, {Icons} from '../../common/Icons';
import CommonColors from '../../common/CommonColors';
import CommonStyles from '../../common/CommonStyles';
import Styles from './Styles';
import ReactMarkdown from 'react-native-markdown-display';
import MainHeader from '../../component/MainHeader';
import Header from '../../component/header/Index';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyDKvJBGxmhAYjC7O5stDTBHeexdLT6VlMo');

// Define the context for the AI
const SYSTEM_CONTEXT = `You are an AI assistant helping with queries about machine-readable formats (MR) and data conversion. 
Your responses should be well-formatted and use markdown properly:
- Use proper markdown syntax for formatting
- Use ** for bold text (e.g., **bold**)
- Use * for italic text (e.g., *italic*)
- Use proper spacing around markdown elements
- Use proper line breaks between sections
Provide clear, concise responses based on the project requirements. For issues related to document scanning and image upload in your app, guide users on how to use these features effectively and explain how they convert to machine-readable formats.`;

const ChatBot: React.FC = () => {
  const navigation = useNavigation();
  const commonStyles = CommonStyles('white');
  const style = Styles();

  const DUMMY_USER = {
    _id: '1',
    name: 'User',
    avatar:
      'https://cdn5.vectorstock.com/i/1000x1000/47/99/chat-with-user-icon-pictogram-on-gray-vector-28984799.jpg',
  };

  const BOT_USER = {
    _id: 'bot',
    name: 'AI Assistant',
    avatar:
      'https://th.bing.com/th/id/OIP.N8cPckH5CqFISJuRTmYQIAAAAA?rs=1&pid=ImgDetMain',
  };

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize Gemini AI model
  const model = genAI.getGenerativeModel({model: 'gemini-pro'});

  useEffect(() => {
    const welcomeMessage: IMessage = {
      _id: 1,
      text: "**Welcome!** \n\nI'm your AI assistant. How can I help you with problem  faced in  using thi app?",
      createdAt: new Date(),
      user: BOT_USER,
    };
    setMessages([welcomeMessage]);
  }, []);

  const formatMarkdown = (text: string): string => {
    // Clean up markdown formatting
    return text
      .replace(/\*\*/g, '**') // Normalize bold syntax
      .replace(/\*([^*]+)\*/g, '*$1*') // Normalize italic syntax
      .replace(/\n\s*\n/g, '\n\n') // Normalize line breaks
      .replace(/\s+\*\*/g, ' **') // Add proper spacing around bold
      .replace(/\*\*\s+/g, '** ') // Add proper spacing after bold
      .trim();
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const result = await model.generateContent({
        contents: [{role: 'user', parts: [{text: userMessage}]}],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const response = await result.response;
      return formatMarkdown(response.text());
    } catch (error) {
      console.error('Error generating AI response:', error);
      return 'I apologize, but I encountered an error processing your request. Could you please try again?';
    }
  };

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    setIsTyping(true);

    const aiResponse = await generateAIResponse(newMessages[0].text);

    const botMessage: IMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: aiResponse,
      createdAt: new Date(),
      user: BOT_USER,
    };

    setIsTyping(false);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [botMessage]),
    );
  }, []);

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      renderMessageText={messageProps => (
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}>
          <ReactMarkdown
            style={{
              body: {
                color:
                  props.position === 'left'
                    ? CommonColors.BLACK
                    : CommonColors.WHITE,
                fontSize: moderateScale(14),
              },
              strong: {
                fontWeight: 'bold',
              },
              em: {
                fontStyle: 'italic',
              },
              paragraph: {
                marginVertical: 4,
              },
            }}>
            {messageProps.currentMessage.text}
          </ReactMarkdown>
        </View>
      )}
      wrapperStyle={{
        right: {
          backgroundColor: CommonColors.THEME,
          borderBottomRightRadius: 0,
          borderRadius: moderateScale(16),
          padding: 0,
        },
        left: {
          backgroundColor: CommonColors.VERY_LIGHT_GRAY,
          borderBottomLeftRadius: 0,
          borderRadius: moderateScale(16),
          padding: 0,
        },
      }}
    />
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar
        backgroundColor={CommonColors.STATUSBAR}
        barStyle="light-content"
      />

      <Header title="Chat  Bot" />
      <View style={commonStyles.container}>
        <View
          style={{
            backgroundColor: CommonColors.WHITE,
            flex: 1,
          }}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={DUMMY_USER}
            renderBubble={renderBubble}
            isTyping={isTyping}
            renderComposer={props => (
              <Composer
                {...props}
                textInputStyle={{
                  borderRadius: moderateScale(20),
                  backgroundColor: CommonColors.BG_WHITE,
                  padding: scale(10),
                  fontSize: moderateScale(16),
                  color: CommonColors.BLACK,
                  marginHorizontal: scale(5),
                }}
              />
            )}
            renderSend={props => (
              <TouchableOpacity
                onPress={() => props.onSend({text: props.text}, true)}
                style={style.sendButton}>
                <Icon
                  type={Icons.FontAwesome}
                  name={'send'}
                  size={moderateScale(17)}
                  color={CommonColors.WHITE}
                />
              </TouchableOpacity>
            )}
            renderInputToolbar={props => (
              <View style={style.inputToolbar}>
                {props.renderComposer ? props.renderComposer(props) : null}
                {props.renderSend ? props.renderSend(props) : null}
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatBot;
