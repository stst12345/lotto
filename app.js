document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const deleteBtn = document.getElementById('delete-history-btn');
    const mainNumbersDisplay = document.getElementById('main-numbers');
    const historyList = document.getElementById('history-list');

    // 기록 저장을 위한 배열
    let history = [];

    // 버튼 이벤트 리스너
    generateBtn.addEventListener('click', handleGenerate);
    deleteBtn.addEventListener('click', clearHistory);

    function getBallColorClass(num) {
        if (num <= 10) return 'ball-yellow';
        if (num <= 20) return 'ball-blue';
        if (num <= 30) return 'ball-red';
        if (num <= 40) return 'ball-gray';
        return 'ball-green';
    }

    function generateRandomNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function handleGenerate() {
        // 번호 생성
        const newNumbers = generateRandomNumbers();

        // 1. 메인 디스플레이 리렌더링
        renderMainBalls(newNumbers);

        // 2. 기록 추가
        addHistory(newNumbers);
    }

    function renderMainBalls(numbers) {
        mainNumbersDisplay.innerHTML = ''; // 초기화

        numbers.forEach((num, index) => {
            const ball = document.createElement('div');
            // 기본 클래스 및 번호별 색상 클래스 추가
            ball.className = `ball ${getBallColorClass(num)} animated`;
            // 순차적으로 애니메이션 등장하게 딜레이 적용
            ball.style.animationDelay = `${index * 0.1}s`;
            // 투명도 0으로 시작(안보이게)
            ball.style.opacity = '0';
            
            ball.textContent = num;
            mainNumbersDisplay.appendChild(ball);
        });
    }

    function addHistory(numbers) {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const historyObj = { numbers, time: timeString };
        
        // 최신 기록이 최상단에 오도록 배열 앞에 추가
        history.unshift(historyObj);
        
        // 기록 재렌더링
        renderHistory();
    }

    function renderHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '<div class="empty-message">생성된 기록이 없습니다.</div>';
            return;
        }

        historyList.innerHTML = ''; // 초기화

        history.forEach(item => {
            // 외부 컨테이너
            const itemDiv = document.createElement('div');
            itemDiv.className = 'history-item';

            // 공 컨테이너
            const ballsDiv = document.createElement('div');
            ballsDiv.className = 'history-balls';

            // 각각의 미니 공 생성
            item.numbers.forEach(num => {
                const miniBall = document.createElement('div');
                miniBall.className = `mini-ball ${getBallColorClass(num)}`;
                miniBall.textContent = num;
                ballsDiv.appendChild(miniBall);
            });

            // 시간 텍스트
            const timeDiv = document.createElement('div');
            timeDiv.className = 'history-time';
            timeDiv.textContent = item.time;

            // 조립
            itemDiv.appendChild(ballsDiv);
            itemDiv.appendChild(timeDiv);

            historyList.appendChild(itemDiv);
        });
    }

    function clearHistory() {
        history = [];
        // 메인 공도 초기 상태로
        mainNumbersDisplay.innerHTML = `
            <div class="ball ball-empty">?</div>
            <div class="ball ball-empty">?</div>
            <div class="ball ball-empty">?</div>
            <div class="ball ball-empty">?</div>
            <div class="ball ball-empty">?</div>
            <div class="ball ball-empty">?</div>
        `;
        renderHistory();
    }

    // 초기화 메시지 렌더링
    renderHistory();
});
