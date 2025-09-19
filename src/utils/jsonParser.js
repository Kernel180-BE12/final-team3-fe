// utils/jsonParser.js
export const parseNestedJsonError = (errorResponse) => {
  try {
    //const outerData = JSON.parse(errorResponse);
    const messageContent = errorResponse.error.message;
    
    // "400 Bad Request: " 이후의 JSON 부분 추출
    const jsonStart = messageContent.indexOf('{"');
    if (jsonStart === -1) {
      throw new Error('JSON 데이터를 찾을 수 없습니다');
    }
    
    const jsonString = messageContent.substring(jsonStart, messageContent.length - 1);
    const innerData = JSON.parse(jsonString);
    
    return {
      success: true,
      data: innerData,
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message
    };
  }
};
