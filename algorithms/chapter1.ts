// 二分法的递归实现
const rank = (key, a, lo, hi) => {
    // 总有一个最简单的情况，包含一个return语句
    if(lo > hi) return -1;
    const middle = lo + (hi - lo) / 2;
    // 尝试解决规模更小的子问题，递归调用的范围逐渐减小
    if(key < a[middle]) return rank(key, a, lo, middle - 1);
    // 递归调用的父问题和尝试解决的子问题不应该有交集，父问题范围：[lo, hi]，子问题范围：[middle, hi]
    else if(key > a[middle]) return rank(key, a, middle + 1, hi);
    else return middle;
}