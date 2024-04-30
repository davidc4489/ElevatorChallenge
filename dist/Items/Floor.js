export default class Floor {
    floorNumber;
    isWaiting;
    timeToWait;
    timer;
    buildingIndex;
    constructor(floorNumber, buildingIndex) {
        this.floorNumber = floorNumber;
        this.isWaiting = false;
        this.timeToWait = 0;
        this.timer = null;
        this.buildingIndex = buildingIndex;
    }
    render() {
        // Display the button in green if the floor is waiting 
        const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
        // Show wait time if floor is waiting
        const timeToDisplay = this.timeToWait > 0 ? `<span class="time-to-wait">${this.timeToWait}</span>` : '';
        // The button contains information about its building and its floor
        return `
        <div class="blackline"></div>
        <div class="floor">
            <div class="floor-content">
                <button class="${buttonClass}" floorNumberData="${this.floorNumber}" buildingIndexData="${this.buildingIndex}" >
                    ${this.floorNumber}
                </button>
                <div class="time-to-wait">
                    ${timeToDisplay}
                </div>
            </div>
        </div>`;
    }
    updateRender() {
        // const element = document.querySelector(`.floor-button[floorNumberData="${this.floorNumber}"]`) as HTMLElement | null;
        const element = document.querySelector(`.floor-button[floorNumberData="${this.floorNumber}"][buildingIndexData="${this.buildingIndex}"]`);
        if (element) {
            const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
            element.className = buttonClass;
            const timeDisplay = this.timeToWait > 0 ? `<span class="time-to-wait">${this.timeToWait}</span>` : '';
            element.innerHTML = `${this.floorNumber} ${timeDisplay}`;
        }
    }
    setTime(secondsToWait) {
        this.timeToWait = secondsToWait;
        if (this.timer) {
            clearInterval(this.timer); // Stop the preview timer
        }
        if (this.timeToWait > 0) {
            this.timer = setInterval(() => {
                if (this.timeToWait >= 0.5) {
                    this.timeToWait -= 0.5;
                    this.updateRender();
                }
                if (this.timeToWait <= 0) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, 500);
        }
        this.updateRender();
    }
}
