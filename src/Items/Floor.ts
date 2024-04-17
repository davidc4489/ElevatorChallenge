export default class Floor {
    private floorNumber: number;
    public isWaiting: boolean;
    public timeToWait: number;
    private timer: number | null;

    constructor(floorNumber: number) {
        this.floorNumber = floorNumber;
        this.isWaiting = false;
        this.timeToWait = 0;
        this.timer = null;
    }


    public render(): string {

        const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
        const timeToDisplay = this.timeToWait > 0 ? `<span class="time-to-wait">${this.timeToWait}</span>` : '';

        return `
        <div class="blackline"></div>
        <div class="floor">
            <div class="floor-content">
                <button class="${buttonClass}" floorNumberData="${this.floorNumber}">
                    ${this.floorNumber}
                </button>
                <div class="time-to-wait">
                    ${timeToDisplay}
                </div>
            </div>
        </div>`;
    }

    public updateRender(): void {
        const element = document.querySelector(`.floor-button[floorNumberData="${this.floorNumber}"]`) as HTMLElement | null;
        if (element) {
            const buttonClass = this.isWaiting ? 'metal linear floor-button green' : 'metal linear floor-button';
            element.className = buttonClass;
            const timeDisplay = this.timeToWait > 0 ? `<span class="time-to-wait">${this.timeToWait}</span>` : '';
            element.innerHTML = `${this.floorNumber} ${timeDisplay}`;
        }
    }

    public setTime(secondsToWait: number) : void {
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
                    clearInterval(this.timer!);
                    this.timer = null;
                }
            }, 500);
        }
        this.updateRender();
    }

}