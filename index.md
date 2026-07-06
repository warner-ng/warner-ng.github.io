##  Hi there!

---

My name is Binghuan (Warner) Wu, a junior student passionate about robotics and sustainable energy. I am fortunate to conduct robotics research under the guidance of [Prof. Koushil Sreenath](https://hybrid-robotics.berkeley.edu/koushil/). My research focus are humanoid robot visual motor learning, whole-body control using both control theory and learning method.

From here on, I will devote myself to creating a world with human-friendly robots that are natural, elegant and helpful. Welcome to join me on this journey!

---
## News

[2026.5] Our paper [DiscoForcing](https://discoforcing.github.io/) is accepted by ICML 2026!

[2026.3] Several technical blogs release. Take a look [here](https://warner-ng.github.io/blogs/blogIndex.html).

---

## Publications

<div style="border: 1px solid var(--border-muted); border-radius: 10px; padding: 16px; margin-bottom: 30px;">
<div style="display: flex; gap: 25px; align-items: flex-start; flex-wrap: wrap;">
  <div style="flex-shrink: 0; width: 100%; max-width: 250px;">
    <img src="images/demo.gif?raw=true" style="width: 100%; height: auto; border-radius: 6px; display: block; border: 2px solid var(--border-muted);"/>
  </div>
  <div style="flex: 1; min-width: 200px; max-width: 100%; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <p style="margin: 0 0 8px 0; font-size: 16.67px;"><a href="https://discoforcing.github.io/" target="_blank" rel="noopener" style="color: #2f7ac0; text-decoration: none; font-weight: 700;">DiscoForcing: A Unified Framework for Real-Time Audio-Driven Character Control with Diffusion Forcing</a></p>
      <p style="margin: 5px 0; font-size: 14.67px;">Kaiyang Ji*, Bingsheng Qian*, <strong>Binghuan Wu*</strong>, Kangyi Chen, Ye Shi, Jingya Wang</p>
      <p style="font-style: italic; margin: 5px 0; font-size: 14.67px;"><strong>ICML 2026</strong></p>
    </div>
    <div style="margin-top: 0; box-sizing: border-box; width: 100%; font-size: 14.67px;">
      <a href="https://discoforcing.github.io/" target="_blank" rel="noopener" style="color: #2f7ac0; text-decoration: none;">webpage</a> |
      <a href="https://arxiv.org/pdf/2605.28491" target="_blank" rel="noopener" style="color: #2f7ac0; text-decoration: none;">pdf</a> |
      <a href="#" id="open-abstract-modal" style="color: #2f7ac0; text-decoration: none;">abstract</a> |
      <a href="#" id="open-bibtex-modal" style="color: #2f7ac0; text-decoration: none;">bibtex</a> |
      <a href="https://arxiv.org/abs/2605.28491" target="_blank" rel="noopener" style="color: #2f7ac0; text-decoration: none;">arXiv</a>
      <p style="font-style: italic; margin: 8px 0 0 0; font-size: 13px; color: var(--text-muted);">""A real-time music-conditioned whole body control policy that makes robots understand your music""</p>
    </div>
  </div>
</div>
</div>

<div id="paper-modal-overlay" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.35); display: none; z-index: 1200;"></div>

<div id="paper-modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(760px, calc(100vw - 32px)); max-height: min(80vh, 920px); background: var(--panel-bg); border-radius: 12px; border: 1px solid var(--border-muted); box-shadow: 0 18px 55px rgba(0, 0, 0, 0.28); display: none; z-index: 1201; overflow: hidden;">
  <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: var(--panel-bg-soft); border-bottom: 1px solid var(--border-muted);">
    <strong id="paper-modal-title" style="color: #2f7ac0;">DiscoForcing</strong>
    <button id="close-paper-modal" type="button" style="cursor: pointer; border: 1px solid var(--border-muted); background: var(--page-bg); border-radius: 6px; padding: 4px 10px; color: var(--text-main);">Close</button>
  </div>
  <div id="paper-modal-content" style="padding: 14px 16px 18px 16px; color: var(--text-main); overflow-y: auto; max-height: calc(80vh - 58px); line-height: 1.58;"></div>
</div>

<script>
  (function () {
    var overlay = document.getElementById('paper-modal-overlay');
    var modal = document.getElementById('paper-modal');
    var title = document.getElementById('paper-modal-title');
    var content = document.getElementById('paper-modal-content');
    var openAbstractBtn = document.getElementById('open-abstract-modal');
    var openBibtexBtn = document.getElementById('open-bibtex-modal');
    var closeBtn = document.getElementById('close-paper-modal');

    var abstractText = 'We study real-time audio-responsive character control as a deployment-faithful problem: strictly causal, bounded-latency streaming that must generate coherent full-body motion at interactive frame rates while the audio condition can change abruptly (tempo shifts, drops, or user edits). Prior music-to-motion systems are largely optimized for offline generation with global context, and degrade in streaming rollouts where conditioning history becomes stale or unreliable. We introduce DiscoForcing, a streaming audio-driven diffusion framework that combines a causal music encoder that captures rhythmic structure and phase dynamics with a diffusion-forcing sequence model trained under heterogeneous noise levels across the temporal horizon. Building on this, we design a hybrid temporal schedule and a history-guided streaming sampler to explicitly trade off responsiveness against long-horizon consistency under non-stationary audio. Implemented in an end-to-end real-time interactive system with online avatar playback and humanoid deployment workflows, DiscoForcing delivers more stable long-horizon rollouts and sharper audio-motion alignment than prior baselines under matched causality and latency constraints while maintaining real-time throughput.';

    var bibtexText = '@inproceedings{ji2026discoforcing,\n  title={DiscoForcing: A Unified Framework for Real-Time Audio-Driven Character Control with Diffusion Forcing},\n  author={Ji, Kaiyang and Qian, Bingsheng and Wu, Binghuan and Chen, Kangyi and Shi, Ye and Wang, Jingya},\n  booktitle={Forty-third International Conference on Machine Learning},\n  year={2026}\n}';

    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function showModal(modalTitle, bodyHtml) {
      title.textContent = modalTitle;
      content.innerHTML = bodyHtml;
      overlay.style.display = 'block';
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function hideModal() {
      overlay.style.display = 'none';
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    openAbstractBtn.addEventListener('click', function (event) {
      event.preventDefault();
      showModal('DiscoForcing - Abstract', '<p style="margin: 0;">' + escapeHtml(abstractText) + '</p>');
    });

    openBibtexBtn.addEventListener('click', function (event) {
      event.preventDefault();
      showModal('DiscoForcing - BibTeX', '<pre style="margin: 0; padding: 12px; background: var(--panel-bg-soft); border: 1px solid var(--border-muted); border-radius: 8px; overflow-x: auto; white-space: pre; color: var(--text-main);">' + escapeHtml(bibtexText) + '</pre>');
    });

    closeBtn.addEventListener('click', hideModal);
    overlay.addEventListener('click', hideModal);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        hideModal();
      }
    });
  })();
</script>

---

### My Current Occupations

- [Research Intern, Shanghai AI Lab.](https://www.shlab.org.cn/)
- [Student Staff, Berkeley Emerging Technology Association](https://betaucb.org/)
- [Student Staff, Students' Association for Science and Technology of Tongji Univ.](https://www.tongji.edu.cn/)
- [Chief Technology Officer, Autonomous Driving Department of Lotus Tongji Racing Team](http://www.tjuracing.com/)

---
### Miscellanea

<details>
<summary><strong>Great Minds That Matter to Me</strong></summary>
<br>
<div style="display: flex; gap: 15px; align-items: center;">
  <div style="text-align: center;">
    <img src="images/Kyrie_Irvine.jpg?raw=true" width="100" height="100" style="object-fit: cover; border-radius: 10px;"/>
    <p style="font-size: 12px; margin: 5px 0;">Kyrie Irving</p>
  </div>
  <div style="text-align: center;">
    <img src="images/Taylor_Swift.jpg?raw=true" width="100" height="100" style="object-fit: cover; border-radius: 10px;"/>
    <p style="font-size: 12px; margin: 5px 0;">Taylor Swift</p>
  </div>
  <div style="text-align: center;">
    <img src="images/Steve_Jobs.jpg?raw=true" width="100" height="100" style="object-fit: cover; border-radius: 10px;"/>
    <p style="font-size: 12px; margin: 5px 0;">Steve Jobs</p>
  </div>
</div>
</details>

<details>
<summary><strong>Products Proudly Made</strong></summary>
<br>
<p>[Hardware]</p>
<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 10px 0;">
  <img src="images/design1.png?raw=true" width="155" height="155" style="object-fit: cover; border-radius: 10px;">
  <img src="images/design2.jpg?raw=true" width="155" height="155" style="object-fit: cover; border-radius: 10px;">
</div>
<p>[Software]</p>
<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 10px 0;">
  <img src="images/app1.jpg?raw=true" width="120" height="260" style="object-fit: cover; border-radius: 10px;">
  <img src="images/app2.jpg?raw=true" width="120" height="260" style="object-fit: cover; border-radius: 10px;">
  <img src="images/app3.jpg?raw=true" width="120" height="260" style="object-fit: cover; border-radius: 10px;">
</div>
</details>

<details>
<summary><strong>My Homebrew RL Tutorial Series</strong></summary>
<br>
<div style="text-align: center; margin: 20px 0;">
  <iframe src="//player.bilibili.com/player.html?bvid=BV1WqweeYE3q&page=1&autoplay=0" 
          scrolling="no" 
          border="0" 
          frameborder="no" 
          framespacing="0" 
          allowfullscreen="true" 
          style="width: 540px; height: 360px; max-width: 100%; border-radius: 10px;">
  </iframe>
  <p style="font-style: italic; margin-top: 10px; color: var(--text-muted);">My homebrew RL tutorial series with theory and codes</p>
  <p style="font-style: italic; margin-top: 10px; color: var(--text-muted);">Explore more episodes inside <a href="https://www.bilibili.com/video/BV1WqweeYE3q/?vd_source=166c5eb6c6dcc6e1244ee9c8b88a89ba">My channel</a></p>
</div>
</details>
<br>

---
