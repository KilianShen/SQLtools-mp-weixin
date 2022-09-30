const Basic = {
    /**
     * px转rpx
     * @param px px值
     * @returns rpx值
     */
    pxToRpx: (px: number): number => {
        return (750 / uni.getSystemInfoSync().windowWidth) * px;
    },

    /**
     * rpx转px
     * @param rpx rpx值
     * @returns px值
     */
    rpxToPx: (rpx: number): number => {
        return (uni.getSystemInfoSync().windowWidth / 750) * rpx;
    },
};

export default Basic;
