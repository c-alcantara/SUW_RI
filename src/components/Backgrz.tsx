"use client"

const Backgrz = () => {
  //Noise & Texture plugin developed byhttps://x.com/intent/follow?screen_name=rogie
  return (
    <div className="invert fixed inset-0 w-full h-full overflow-hidden z-[-1]">
      <iframe
        width="110%"
        height="100%"
        src="data:text/html;base64,PGh0bWw+CiAgICAgICAgPGhlYWQ+CiAgICAgICAgICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSI+CiAgICAgICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgICAgIGh0bWwsIGJvZHl7CiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwOwogICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7CiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMDsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgPC9zdHlsZT4KICAgICAgICAgICAgPHNjcmlwdCB0eXBlPSJpbXBvcnRtYXAiPgp7CiAgICAiaW1wb3J0cyI6IHsKICAgICAgICAicmVhY3QiOiAiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvcmVhY3RAMTguMC4yIiwKICAgICAgICAicmVhY3QtZG9tIjogImh0dHBzOi8vY2RuLnNreXBhY2suZGV2L3JlYWN0LWRvbUAxOC4wLjIiLAogICAgICAgICJ0aHJlZSI6ICJodHRwczovL2Nkbi5za3lwYWNrLmRldi90aHJlZUAwLjE0OC4wIiwKICAgICAgICAicmVhY3QtdGhyZWUvZmliZXIiOiAiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvQHJlYWN0LXRocmVlL2ZpYmVyQDcuMC4yNCIKICAgIH0KfQo8L3NjcmlwdD4KPHN0eWxlPgogICAgaHRtbCwgYm9keXsKICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgcGFkZGluZzogMDsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgYm9yZGVyOiAwOwogICAgfQogICAgLm50LWVtYmVkewogICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgIGhlaWdodDogMTAwJTsKICAgIH0KICAgIC5udC1lbWJlZCBjYW52YXN7CiAgICAgICAgd2lkdGg6IDEwMCU7CiAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgfQo8L3N0eWxlPgo8c2NyaXB0IHR5cGU9Im1vZHVsZSI+CiAgICBpbXBvcnQgUmVhY3QsIHt1c2VSZWYsdXNlTWVtb30gZnJvbSAncmVhY3QnOwogICAgaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CiAgICBpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7CiAgICBpbXBvcnQge0NhbnZhcywgdXNlRnJhbWUsIHVzZVRocmVlfSBmcm9tICdyZWFjdC10aHJlZS9maWJlcic7CgogICAgbGV0IGVtYmVkUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgZW1iZWRSb290LmNsYXNzTmFtZSA9ICJudC1lbWJlZCI7CiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVtYmVkUm9vdCk7CgogICAgY29uc3QgVGV4dHVyZU1lc2ggPSAoKSA9PiB7CiAgICAgICAgY29uc3QgbWVzaCA9IHVzZVJlZihudWxsKQogICAgICAgIHVzZUZyYW1lKHN0YXRlID0+IHsKICAgICAgICAgICAgY29uc3QgeyBjbG9jaywgbW91c2UsIGdsLCBzY2VuZSwgY2FtZXJhIH0gPSBzdGF0ZQogICAgICAgICAgICBpZihtZXNoLmN1cnJlbnQpewogICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfbW91c2UudmFsdWUgPSBbbW91c2UueCAvIDIgKyAwLjUsIG1vdXNlLnkgLyAyICsgMC41XQogICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfdGltZS52YWx1ZSA9IGNsb2NrLmdldEVsYXBzZWRUaW1lKCkKICAgICAgICAgICAgICAgIGxldCBjID0gZ2wuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKQogICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfcmVzb2x1dGlvbi52YWx1ZSA9IFtjLndpZHRoLGMuaGVpZ2h0XQogICAgICAgICAgICB9CiAgICAgICAgfSkKICAgICAgICAKICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnbWVzaCcsCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgIHJlZjptZXNoLAogICAgICAgICAgICAgICAgcG9zaXRpb246IFswLDAsMF0sCiAgICAgICAgICAgICAgICBzY2FsZTogMSwKICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbMCwwLDBdCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BsYW5lR2VvbWV0cnknLHthcmdzOlsyNDAsNTgwXX0pLCAKICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc2hhZGVyTWF0ZXJpYWwnLHsKICAgICAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyOiBgdW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjsKCnVuaWZvcm0gZmxvYXQgdV90aW1lOwoKdW5pZm9ybSB2ZWMzIHVfY29sb3I7Cgp1bmlmb3JtIHZlYzQgdV9iYWNrZ3JvdW5kOwoKdW5pZm9ybSBmbG9hdCB1X3NwZWVkOwoKdW5pZm9ybSBmbG9hdCB1X2RldGFpbDsKCgoKLyoKCiogQGF1dGhvciBIYXpzaSAoa2luZGEpCgoqLwoKbWF0MiBtKGZsb2F0IGEpIHsKCiAgICBmbG9hdCBjPWNvcyhhKSwgcz1zaW4oYSk7CgogICAgcmV0dXJuIG1hdDIoYywtcyxzLGMpOwoKfQoKCgoKCgojaWZuZGVmIEZOQ19SR0IyTFVNQQojZGVmaW5lIEZOQ19SR0IyTFVNQQpmbG9hdCByZ2IybHVtYShpbiB2ZWMzIGNvbG9yKSB7CiAgICByZXR1cm4gZG90KGNvbG9yLCB2ZWMzKDAuMjk5LCAwLjU4NywgMC4xMTQpKTsKfQpmbG9hdCByZ2IybHVtYShpbiB2ZWM0IGNvbG9yKSB7CiAgICByZXR1cm4gcmdiMmx1bWEoY29sb3IucmdiKTsKfQojZW5kaWYKCgojaWZuZGVmIEZOQ19MVU1BCiNkZWZpbmUgRk5DX0xVTUEKZmxvYXQgbHVtYShmbG9hdCB2KSB7IHJldHVybiB2OyB9CmZsb2F0IGx1bWEoaW4gdmVjMyB2KSB7IHJldHVybiByZ2IybHVtYSh2KTsgfQpmbG9hdCBsdW1hKGluIHZlYzQgdikgeyByZXR1cm4gcmdiMmx1bWEodi5yZ2IpOyB9CiNlbmRpZgoKCgpmbG9hdCBtYXAodmVjMyBwKSB7CgogICAgZmxvYXQgdCA9IHVfdGltZSAqIHVfc3BlZWQ7CgogICAgcC54eiAqPSBtKHQgKiAwLjQpO3AueHkqPSBtKHQgKiAwLjEpOwoKICAgIHZlYzMgcSA9IHAgKiAyLjAgKyB0OwoKICAgIHJldHVybiBsZW5ndGgocCt2ZWMzKHNpbigodCp1X3NwZWVkKSAqIDAuMSkpKSAqIGxvZyhsZW5ndGgocCkgKyAwLjkpICsgY29zKHEueCArIHNpbihxLnogKyBjb3MocS55KSkpICogMC41IC0gMS4wOwoKfQoKCgp2b2lkIG1haW4oKSB7CgogICAgdmVjMiBhID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdV9yZXNvbHV0aW9uLnggLSB2ZWMyKDAuNSwgMC41KTsKCiAgICB2ZWMzIGNsID0gdmVjMygwLjApOwoKICAgIGZsb2F0IGQgPSAyLjU7CgoKCiAgICBmb3IgKGZsb2F0IGkgPSAwLjsgaSA8PSAoMS4gKyAyMC4gKiB1X2RldGFpbCk7IGkrKykgewoKICAgICAgICB2ZWMzIHAgPSB2ZWMzKDAsIDAsIDQuMCkgKyBub3JtYWxpemUodmVjMyhhLCAtMS4wKSkgKiBkOwoKICAgICAgICBmbG9hdCByeiA9IG1hcChwKTsKCiAgICAgICAgZmxvYXQgZiA9ICBjbGFtcCgocnogLSBtYXAocCArIDAuMSkpICogMC41LCAtMC4xLCAxLjApOwoKICAgICAgICB2ZWMzIGwgPSB2ZWMzKDAuMSwgMC4zLCAwLjQpICsgdmVjMyg1LjAsIDIuNSwgMy4wKSAqIGY7CgogICAgICAgIGNsID0gY2wgKiBsICsgc21vb3Roc3RlcCgyLjUsIDAuMCwgcnopICogMC42ICogbDsKCiAgICAgICAgZCArPSBtaW4ocnosIDEuMCk7CgogICAgfQoKICAgIAoKICAgIHZlYzQgY29sb3IgPSB2ZWM0KG1pbih1X2NvbG9yLCBjbCksMS4wKTsKCiAgICAvL2NvbG9yID0gbWluKHVfYmFja2dyb3VuZCwgdV9jb2xvcik7CgogICAgY29sb3IuciA9IG1heCh1X2JhY2tncm91bmQucixjb2xvci5yKTsKCiAgICBjb2xvci5nID0gbWF4KHVfYmFja2dyb3VuZC5nLGNvbG9yLmcpOwoKICAgIGNvbG9yLmIgPSBtYXgodV9iYWNrZ3JvdW5kLmIsY29sb3IuYik7CgogICAgCgoKCiAgICBnbF9GcmFnQ29sb3IgPSBjb2xvcjsKCn0KCmAsCiAgICAgICAgICAgICAgICB2ZXJ0ZXhTaGFkZXI6IGAKICAgICAgICAgICAgdm9pZCBtYWluKCkgewogICAgICAgICAgICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTsKICAgICAgICB9YCwKICAgICAgICAgICAgICAgIHVuaWZvcm1zOiB7dV9jb2xvcjoge3ZhbHVlOiBbMSwxLDFdfSx1X2JhY2tncm91bmQ6IHt2YWx1ZTogWzAsMCwwLDFdfSx1X3NwZWVkOiB7dmFsdWU6IDAuMTk3fSx1X2RldGFpbDoge3ZhbHVlOiAwLjR9LHVfdGltZToge3ZhbHVlOiAwfSx1X21vdXNlOiB7dmFsdWU6IFswLDBdfSx1X3Jlc29sdXRpb246IHt2YWx1ZTogWzI0MCw1ODBdfX0sCiAgICAgICAgICAgICAgICB3aXJlZnJhbWU6IGZhbHNlLCAKICAgICAgICAgICAgICAgIHdpcmVmcmFtZUxpbmV3aWR0aDogMCwKICAgICAgICAgICAgICAgIGRpdGhlcmluZzogZmFsc2UsCiAgICAgICAgICAgICAgICBmbGF0U2hhZGluZzogdHJ1ZSwKICAgICAgICAgICAgICAgIGRvdWJsZVNpZGVkOiB0cnVlLAogICAgICAgICAgICAgICAgZ2xzbFZlcnNpb246ICIxMDAiCiAgICAgICAgICAgIH0pCiAgICAgICAgKTsgIAogICAgfQoKICAgIFJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KENhbnZhcyx7CiAgICAgICAgICAgIGdsOiB7CiAgICAgICAgICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsCiAgICAgICAgICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IGZhbHNlLAogICAgICAgICAgICAgICAgYWxwaGE6IHRydWUsCiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSwKICAgICAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSwKICAgICAgICAgICAgICAgIHByZWNpc2lvbjogImhpZ2hwIiwKICAgICAgICAgICAgICAgIHBvd2VyUHJlZmVyZW5jZTogImhpZ2gtcGVyZm9ybWFuY2UiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHJlc2l6ZTp7CiAgICAgICAgICAgICAgICBkZWJvdW5jZTogMCwKICAgICAgICAgICAgICAgIHNjcm9sbDogZmFsc2UsCiAgICAgICAgICAgICAgICBvZmZzZXRTaXplOiB0cnVlCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIGRwcjogMSwKICAgICAgICAgICAgY2FtZXJhOiB7CiAgICAgICAgICAgICAgICBmb3Y6IDc1LAogICAgICAgICAgICAgICAgbmVhcjogMC4xLAogICAgICAgICAgICAgICAgZmFyOiAxMDAwLAogICAgICAgICAgICAgICAgcG9zaXRpb246IFswLDAsNV0KICAgICAgICAgICAgfSwKICAgICAgICAgICAgc3R5bGU6eyBoZWlnaHQ6ICIxMDAlIiwgd2lkdGg6ICIxMDAlIiB9CiAgICAgICAgfSwKICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHR1cmVNZXNoKSAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgKSwgZW1iZWRSb290KTsKPC9zY3JpcHQ+CiAgICAgICAgPC9oZWFkPgogICAgICAgIDxib2R5Pgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvYm9vay41ZmIxMWI4ZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvbHlnaWEuZjc0OTA1OTQuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL292ZXJmbG93LjhkNTA0MTVkLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy90cmFzaC41MjRkYmNkMy5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvdmVydGljYWwuOTA2MTA4NDkuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL2hvcml6b250YWwuNDRmNzcxZjguc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL2FkZC5hNTUyNDBkZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvc2lnLjg1MGE4NWU3LnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9taW51cy4xZTFhMGFiZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvZWZmZWN0LjQ1NTcyNDNmLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy92aXNpYmxlLmM2ZDRlMWMwLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9oaWRkZW4uNWE0ZmMyNTQuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL3dvcmtlci5iNzYxZmIxMS5qcyAtLT4KPC9ib2R5PgogICAgICAgIDwvaHRtbD4="
      />
    </div>
  );
}

export default Backgrz;


