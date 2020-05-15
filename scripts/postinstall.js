const env = process.env;
const ADBLOCK = is(env.ADBLOCK);
const CI = is(env.CI);
const DISABLE_OPENCOLLECTIVE = is(env.DISABLE_OPENCOLLECTIVE);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

if (!ADBLOCK && !CI && !DISABLE_OPENCOLLECTIVE) {
  console.log('\n\x1B[94m>\x1B[94m 感谢使用 vxe-table，为了使项目能够健康持续的发展下去，您可以通过捐赠来支持作者： \x1B[0m');
  console.log('\x1B[96m>\x1B[96m https://xuliangzhan_admin.gitee.io/vxe-table/#/donation/api \x1B[0m\n\n');

  console.log('\x1B[94m>\x1B[94m Thanks for using vxe-table. In order to keep the project healthy and sustainable, you can support the author through donation: \x1B[0m');
  console.log('\x1B[96m>\x1B[96m https://xuliangzhan.com/vxe-table/index.html#/donation/api \x1B[0m\n\n');
}
