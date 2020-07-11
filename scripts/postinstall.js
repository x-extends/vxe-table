const env = process.env;
const ADBLOCK = is(env.ADBLOCK);
const CI = is(env.CI);
const DISABLE_OPENCOLLECTIVE = is(env.DISABLE_OPENCOLLECTIVE);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

if (!ADBLOCK && !CI && !DISABLE_OPENCOLLECTIVE) {
  console.log('\n\x1B[89m>\x1B[93m ✌ 感谢使用 vxe-table ◕‿◕ \x1B[0m');
  console.log('\x1B[89m>\x1B[93m 如果该项目对您有帮助，可以通过以下捐赠来帮助该项目能持续维护下去:  \x1B[0m');
  console.log('\x1B[89m>\x1B[96m https://xuliangzhan_admin.gitee.io/vxe-table/#/donation/api \x1B[0m\n\n');
}
