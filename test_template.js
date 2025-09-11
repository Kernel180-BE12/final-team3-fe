// Node.js script to test template generation API
// Node.js 18+ has built-in fetch

async function testTemplateGeneration() {
    console.log('템플릿 생성 API 테스트 시작...');
    console.log('요청: "학부모님께 과제 안내 템플릿 생성"');
    
    try {
        const startTime = Date.now();
        
        const response = await fetch('http://localhost:8080/api/templates/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: "학부모님께 과제 안내 템플릿 생성",
                targetCustomer: "",
                purpose: ""
            })
        });

        const endTime = Date.now();
        const responseTime = (endTime - startTime) / 1000;
        
        console.log(`\n응답 시간: ${responseTime}초`);
        console.log(`응답 상태: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('\n=== API 응답 결과 ===');
            console.log(JSON.stringify(data, null, 2));
            
            // 생성된 템플릿 데이터 확인
            if (data.success && data.data && data.data.aiRes) {
                // aiRes가 문자열로 반환되므로 파싱 필요
                const template = typeof data.data.aiRes === 'string' 
                    ? JSON.parse(data.data.aiRes) 
                    : data.data.aiRes;
                    
                console.log('\n=== 생성된 템플릿 정보 ===');
                console.log('제목:', template.title);
                console.log('내용:', template.content);
                console.log('변수 개수:', template.variables ? template.variables.length : 0);
                console.log('버튼 개수:', template.buttons ? template.buttons.length : 0);
                
                if (template.variables && template.variables.length > 0) {
                    console.log('\n=== 변수 목록 ===');
                    template.variables.forEach((variable, index) => {
                        console.log(`${index + 1}. ${variable.variableKey} (${variable.placeholder})`);
                    });
                }
                
                if (template.buttons && template.buttons.length > 0) {
                    console.log('\n=== 버튼 목록 ===');
                    template.buttons.forEach((button, index) => {
                        console.log(`${index + 1}. ${button.text}`);
                    });
                }
            }
        } else {
            const errorText = await response.text();
            console.log('\n=== 오류 응답 ===');
            console.log('응답 내용:', errorText);
        }
        
    } catch (error) {
        console.error('\n=== 네트워크 오류 ===');
        console.error('오류:', error.message);
        console.error('스택 트레이스:', error.stack);
    }
}

testTemplateGeneration();