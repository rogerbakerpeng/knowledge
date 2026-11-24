{{#datagrid}}
<ul class="mui-table-view file-content">
	<li class="em-table-view-card">
		<div class="card-head">
			<span class="card-title">{{{filename}}}</span>
		</div>
		<ul class="card-content em-table-view">
		<!-- 手机上暂不支持预览、下载的附件 -->
		{{#unsupported}}
			<li style="padding-left:15px;line-height:40px">请在PC端操作此类型附件</li>
		{{/unsupported}}
		{{^unsupported}}
			{{#attachex}}
			<li class='em-table-view-cell'>
				<span class='content-title file-name'>{{name}}</span>
				<div class='icon-box'>
					<i class='icon icon-download' onclick="ztbev.phoneDownloadAttach('{{name}}', '{{filetype}}','{{downloadurl}}')"></i>
					<i class='icon icon-more' onclick="ztbev.phonePreviewAttach('{{name}}','{{previewurl}}')"></i>
                </div>
            </li>
       		{{/attachex}}
        	{{^attachex}}
				<li class='em-table-view-cell'><span class='content-title file-name' style='color:#999999'>无电子件</span> </li>
			{{/attachex}}
		{{/unsupported}}
		
		</ul>
	</li>
</ul>
{{/datagrid}}