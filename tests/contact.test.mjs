import test from 'node:test';
import assert from 'node:assert/strict';
import handler, { clean, escapeHtml } from '../api/contact.js';

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

test('escapeHtml neutralizes markup in email content', () => {
  assert.equal(
    escapeHtml(`<script>alert("x")</script> & 'test'`),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#039;test&#039;',
  );
});

test('clean trims and enforces the configured maximum', () => {
  assert.equal(clean('  abcdef  ', 4), 'abcd');
});

test('contact endpoint rejects unsupported methods', async () => {
  const res = createResponse();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.allow, 'POST');
});

test('contact endpoint rejects invalid email before delivery', async () => {
  const res = createResponse();
  await handler({
    method: 'POST',
    headers: {},
    body: { name: 'Test User', email: 'not-an-email', project: 'Website' },
  }, res);
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /valid email/i);
});

test('contact endpoint rejects oversized fields', async () => {
  const res = createResponse();
  await handler({
    method: 'POST',
    headers: {},
    body: { name: 'x'.repeat(121), email: 'test@example.com', project: 'Website' },
  }, res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, 'name is too long');
});

test('contact endpoint reports missing production email configuration', async () => {
  const res = createResponse();
  await handler({
    method: 'POST',
    headers: {},
    body: { name: 'Test User', email: 'test@example.com', project: 'Website' },
  }, res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.status, 'config_missing');
});
