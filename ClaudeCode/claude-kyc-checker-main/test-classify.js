'use strict';

const assert = require('assert');
const {
  classifyStatus,
  classifyInquiryUrl,
  extractPlan,
  normalizeOrganizationsPayload,
  describeHttpError,
  shortenUuid
} = require('./classify');

const sample = {
  status: 'not_required',
  check_kind: null,
  vendor_inquiry_id: null,
  vendor_inquiry_url: null,
  should_poll: false,
  created_at: null,
  updated_at: null,
  completed_at: null
};

function test(name, fn) {
  fn();
  console.log('ok - ' + name);
}

test('sample JSON: not_required and no inquiry url', function () {
  const status = classifyStatus(sample.status);
  assert.strictEqual(status.key, 'not_required');
  assert.strictEqual(status.tone, 'ok');
  assert.match(status.explanation, /无需身份验证|可直接升级/);
  const url = classifyInquiryUrl(sample.vendor_inquiry_url);
  assert.strictEqual(url.kind, 'none');
  assert.strictEqual(url.warning, false);
});

test('pending', function () {
  const status = classifyStatus('pending');
  assert.strictEqual(status.key, 'pending');
  assert.strictEqual(status.tone, 'warn');
  assert.match(status.explanation, /KYC|审核/);
});

test('verified and legacy approved', function () {
  const verified = classifyStatus('verified');
  const approved = classifyStatus('approved');
  assert.strictEqual(verified.tone, 'ok');
  assert.strictEqual(approved.tone, 'ok');
  assert.match(verified.explanation, /已通过/);
  assert.match(approved.explanation, /已通过/);
});

test('denied', function () {
  const status = classifyStatus('denied');
  assert.strictEqual(status.key, 'denied');
  assert.strictEqual(status.tone, 'danger');
  assert.match(status.explanation, /拒绝|无法升级/);
});

test('empty and unknown status', function () {
  assert.strictEqual(classifyStatus(null).key, 'unknown');
  assert.strictEqual(classifyStatus('').key, 'unknown');
  const other = classifyStatus('needs_review');
  assert.strictEqual(other.key, 'other');
  assert.strictEqual(other.label, 'needs_review');
});

test('subscription KYC withpersona is normal', function () {
  const url = classifyInquiryUrl('https://inquiry.withpersona.com/verify?inquiry-id=abc');
  assert.strictEqual(url.kind, 'subscription');
  assert.strictEqual(url.warning, false);
  assert.strictEqual(url.tone, 'ok');
  assert.match(url.explanation, /Persona|订阅/);
});

test('portal KYC is a warning', function () {
  const url = classifyInquiryUrl('https://portal.anthropic.com/kyc/start?x=1');
  assert.strictEqual(url.kind, 'portal');
  assert.strictEqual(url.warning, true);
  assert.strictEqual(url.tone, 'danger');
  assert.match(url.explanation, /封号|不要/);
});

test('unknown and invalid inquiry urls', function () {
  const unknown = classifyInquiryUrl('https://example.com/verify');
  assert.strictEqual(unknown.kind, 'unknown');
  assert.strictEqual(unknown.warning, true);
  const invalid = classifyInquiryUrl('not a url');
  assert.strictEqual(invalid.kind, 'invalid');
  assert.strictEqual(invalid.warning, true);
});

test('extract plan from capabilities', function () {
  const plan = extractPlan({
    name: 'demo',
    capabilities: ['chat', 'claude_pro', 'raven'],
    billing_type: 'stripe'
  });
  assert.deepStrictEqual(plan.planLabels, ['claude_pro', 'raven']);
  const fallback = extractPlan({ billing_type: 'stripe', capabilities: ['chat'] });
  assert.deepStrictEqual(fallback.planLabels, ['stripe']);
});

test('normalize organization payloads', function () {
  const org = { uuid: '11111111-2222-3333-4444-555555555555', name: 'A' };
  assert.strictEqual(normalizeOrganizationsPayload([org]).length, 1);
  assert.strictEqual(normalizeOrganizationsPayload({ data: [org] }).length, 1);
  assert.strictEqual(normalizeOrganizationsPayload({ organizations: [org] }).length, 1);
  assert.strictEqual(normalizeOrganizationsPayload(org).length, 1);
  assert.strictEqual(normalizeOrganizationsPayload({}).length, 0);
});

test('http error messages', function () {
  assert.strictEqual(describeHttpError(401, true, '{}').code, 'auth');
  assert.strictEqual(describeHttpError(401, true, '{}').message, '请先登录 claude.ai');
  assert.strictEqual(describeHttpError(403, false, 'login required').code, 'auth');
  assert.strictEqual(describeHttpError(403, false, 'unavailable in your region').code, 'region');
  assert.strictEqual(describeHttpError(200, false, '<html>').code, 'non_json');
  assert.strictEqual(describeHttpError(500, true, '{}').code, 'http');
});

test('shorten uuid', function () {
  const uuid = 'aaaaaaaa-bbbb-cccc-dddd-eeeeffffffff';
  assert.strictEqual(shortenUuid(uuid), 'aaaaaaaa…ffff');
  assert.strictEqual(shortenUuid('short'), 'short');
});

console.log('All tests passed.');
