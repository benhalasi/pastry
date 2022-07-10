
import { MDCTopAppBar, MDCTopAppBarFoundation } from '@material/top-app-bar'
import { MDCComponent } from '@material/base/component'

export const topAppBarOverrideFoundationHeightLimit = (MDCTopAppBarFoundationRef: typeof MDCTopAppBarFoundation, height = 512): void => {
	// MDCTopAppBarFoundationRef.numbers.MAX_TOP_APP_BAR_HEIGHT = height
}

// @ts-ignore
MDCTopAppBarFoundation.prototype.handleTopAppBarClose = () => {}

// @ts-ignore
MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function () {
	if (this.checkForUpdate_()) {
			// Once the top app bar is fully hidden we use the max potential top app bar height as our offset
			// so the top app bar doesn't show if the window resizes and the new height > the old height.
			var offset = this.currentAppBarOffsetTop_;
			if (Math.abs(offset) >= this.topAppBarHeight_) {
					offset = -this.topAppBarHeight_ *2;
					this.handleTopAppBarClose()
			}
			this.adapter.setStyle('top', offset + 'px');
	}
};