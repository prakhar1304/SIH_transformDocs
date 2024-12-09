import { StyleSheet } from 'react-native';
import CommonColors from './CommonColors';

const BOLD = '500'

export const font_8 = 8
export const font_10 = 10
export const font_12 = 12
export const font_14 = 14
export const font_16 = 16
export const font_18 = 18
export const font_20 = 20
export const font_25 = 25

const CommonStyles = (theme:any) => {
    return StyleSheet.create({
        flex_1: {
            flex: 1,
        },
        textCenter: {
            textAlign: 'center'
        },
        materialLabel: {
            position: 'relative',
            paddingLeft: 5
        },
        marginVertical10: {
            marginVertical: 12,
        },
        safeArea: {
            flex: 1,
            backgroundColor: CommonColors[theme]?.STATUSBAR
        },
        container: {
            flex: 1,
            backgroundColor: CommonColors[theme]?.BG_WHITE
        },
        container_body: {
            paddingHorizontal: 10,
            paddingTop: 10,
            flex: 1,
        },
        flex_row: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        },

        // All Text
        heading_25_green: {
            fontWeight: BOLD,
            fontSize: font_25,
            color: CommonColors[theme]?.GREEN,
        },
        heading_25_gray: {
            fontWeight: BOLD,
            fontSize: font_25,
            color: CommonColors[theme]?.GRAY,
        },
        heading_25_black: {
            fontWeight: BOLD,
            fontSize: font_25,
            color: CommonColors[theme]?.BLACK,
        },
        heading_20_red: {
            fontWeight: BOLD,
            fontSize: font_20,
            color: CommonColors[theme]?.RED,
        },
        heading_20_white: {
            fontWeight: BOLD,
            fontSize: font_20,
            color: CommonColors[theme]?.WHITE,
        },
        paragraph_20_white: {
            fontSize: font_20,
            color: CommonColors[theme]?.WHITE,
        },
        heading_20_black: {
            fontWeight: BOLD,
            fontSize: font_20,
            color: CommonColors[theme]?.BLACK,
        },
        heading_20_green: {
            fontWeight: BOLD,
            fontSize: font_20,
            color: CommonColors[theme]?.GREEN,
        },
        heading_20_orange: {
            fontWeight: BOLD,
            fontSize: font_20,
            color: '#FF9500',
        },
        heading_20_gray: {
            fontWeight: BOLD,
            fontSize: font_20,
            color: CommonColors[theme]?.GRAY,
        },
        heading_18_green: {
            fontWeight: BOLD,
            fontSize: font_18,
            color: CommonColors[theme]?.GREEN,
        },
        heading_18_red: {
            fontWeight: BOLD,
            fontSize: font_18,
            color: CommonColors[theme]?.RED,
        },
        heading_18_orange: {
            fontWeight: BOLD,
            fontSize: font_18,
            color: '#FF9500',
        },
        heading_18_white: {
            fontWeight: BOLD,
            fontSize: font_18,
            color: CommonColors[theme]?.WHITE,
        },
        heading_18_black: {
            fontWeight: BOLD,
            fontSize: font_18,
            color: CommonColors[theme]?.BLACK,
        },
        heading_16_white: {
            fontWeight: BOLD,
            fontSize: font_16,
            color: CommonColors[theme]?.WHITE,
        },
        heading_16_red: {
            fontWeight: BOLD,
            fontSize: font_16,
            color: CommonColors[theme]?.RED,
        },
        heading_16_black: {
            fontWeight: BOLD,
            fontSize: font_16,
            color: CommonColors[theme]?.BLACK,
        },
        heading_16_green: {
            fontWeight: BOLD,
            fontSize: font_16,
            color: CommonColors[theme]?.GREEN,
        },
        heading_16_blue: {
            fontWeight: BOLD,
            fontSize: font_16,
            color: CommonColors[theme]?.PRIMARY,
        },
        heading_14_white: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: CommonColors[theme]?.WHITE,
        },
        heading_14_orange: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: '#FF9500',
        },
        heading_14_black: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: CommonColors[theme]?.BLACK,
        },
        heading_14_red: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: CommonColors[theme]?.RED,
        },
        heading_14_gray: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: CommonColors[theme]?.GRAY,
        },
        heading_14_green: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: CommonColors[theme]?.GREEN,
        },
        heading_14_blue: {
            fontWeight: BOLD,
            fontSize: font_14,
            color: CommonColors[theme]?.BLUE,
        },
        heading_12_orange: {
            fontWeight: BOLD,
            fontSize: font_12,
            color: '#FF9500',
        },
        heading_12_gray: {
            fontWeight: BOLD,
            fontSize: font_12,
            color: CommonColors[theme]?.GRAY,
        },
        heading_12_green: {
            fontWeight: BOLD,
            fontSize: font_12,
            color: CommonColors[theme]?.GREEN,
        },
        heading_10_orange: {
            fontWeight: BOLD,
            fontSize: font_10,
            color: '#FF9500',
        },
        heading_10_white: {
            fontWeight: BOLD,
            fontSize: font_10,
            color: '#FFF',
        },
        paragraph_20_black: {
            fontSize: font_20,
            color: CommonColors[theme]?.BLACK
        },
        paragraph_20_gray: {
            fontSize: font_20,
            color: CommonColors[theme]?.GRAY
        },
        paragraph_18_black: {
            fontSize: font_18,
            color: CommonColors[theme]?.BLACK,
        },
        paragraph_16_blue: {
            fontSize: font_16,
            color: CommonColors[theme]?.LIGHT_BLUE,
        },
        paragraph_16_gray: {
            fontSize: font_16,
            color: CommonColors[theme]?.GRAY
        },
        paragraph_16_green: {
            fontSize: font_16,
            color: CommonColors[theme]?.GREEN
        },
        paragraph_16_red: {
            fontSize: font_16,
            color: CommonColors[theme]?.RED,
        },
        paragraph_16_black: {
            fontSize: font_16,
            color: CommonColors[theme]?.BLACK,
        },
        paragraph_16_white: {
            fontSize: font_16,
            color: CommonColors[theme]?.WHITE,
        },
        paragraph_14_black: {
            fontSize: font_14,
            color: CommonColors[theme]?.BLACK,
        },
        paragraph_14_blue: {
            fontSize: font_14,
            color: CommonColors[theme]?.BLUE,
        },
        paragraph_14_gray: {
            fontSize: font_14,
            color: CommonColors[theme]?.GRAY,
        },
        paragraph_14_white: {
            fontSize: font_14,
            color: CommonColors[theme]?.WHITE,
        },
        paragraph_14_green: {
            fontSize: font_14,
            color: CommonColors[theme]?.GREEN,
        },
        paragraph_14_red: {
            fontSize: font_14,
            color: CommonColors[theme]?.RED,
        },
        paragraph_12_black: {
            fontSize: font_12,
            color: CommonColors[theme]?.BLACK,
        },
        paragraph_12_white: {
            fontSize: font_12,
            color: CommonColors[theme]?.WHITE,
        },
        paragraph_12_blue: {
            fontSize: font_12,
            color: CommonColors[theme]?.BLUE,
        },
        paragraph_12_green: {
            fontSize: font_12,
            color: CommonColors[theme]?.GREEN,
        },
        paragraph_12_red: {
            fontSize: font_12,
            color: CommonColors[theme]?.RED,
        },
        paragraph_12_gray: {
            fontSize: font_12,
            color: CommonColors[theme]?.GRAY,
        },
        paragraph_10_gray: {
            fontSize: font_10,
            color: CommonColors[theme]?.GRAY,
        },
        paragraph_10_black: {
            fontSize: font_10,
            color: CommonColors[theme]?.BLACK,
        },
        paragraph_10_white: {
            fontSize: font_10,
            color: CommonColors[theme]?.WHITE,
        },
        paragraph_10_red: {
            fontSize: font_10,
            color: CommonColors[theme]?.RED,
        },
        paragraph_10_green: {
            fontSize: font_10,
            color: CommonColors[theme]?.GREEN,
        },
        paragraph_8_white: {
            fontSize: font_8,
            color: CommonColors[theme]?.WHITE,
        },
        paragraph_8_green: {
            fontSize: font_8,
            color: CommonColors[theme]?.GREEN,
        },
        paragraph_8_black: {
            fontSize: font_8,
            color: CommonColors[theme]?.BLACK,
        },
        paragraph_8_red: {
            fontSize: font_8,
            color: CommonColors[theme]?.RED,
        },
        error: {
            color: CommonColors[theme]?.RED
        },
        center_modal: {
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        center_modal_body: {
            backgroundColor: CommonColors[theme]?.BG_WHITE,
            padding: 10,
            width: '104%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5
        },
        modal_heading: {
            backgroundColor: CommonColors[theme]?.PRIMARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
        },
        bottom_modal: {
            margin: 0,
            justifyContent: 'flex-end',
        },
        bottom_modal_body: {
            backgroundColor: CommonColors[theme]?.BG_WHITE,
            padding: 10,
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
            justifyContent: 'center',
        },
        bottom_card_line: {
            backgroundColor: CommonColors[theme]?.GRAY,
            borderRadius: 10,
            height: 5,
            width: 50,
            marginBottom: 20,
            alignSelf: 'center'
        },
        circle: {
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: CommonColors[theme]?.SKY_BLUE,
            marginEnd: 10,
            alignSelf: 'center'
        },
        justify_content_space_between: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        justify_content_space_evenly: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        }
    });
}
export default CommonStyles;
