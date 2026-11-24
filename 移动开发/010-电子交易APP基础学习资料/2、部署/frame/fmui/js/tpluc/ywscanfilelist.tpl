{{#datagrid}}
<ul class="mui-table-view file-content">
	<li class="em-table-view-card">
		<div class="card-head">
			<span class="card-title">{{{name}}}</span>
			{{#upfile}}<span class="r mui-icon mui-icon-upload" style="color: blue;" filecode="{{filecode}}" clientguid="{{clientguid}}"><span style="font-size:18px;">点击上传</span></span>{{/upfile}}
			{{^upfile}}{{#buttonexurl}}<span class="r mui-icon mui-icon-gear" style="color: blue;" filecode="{{filecode}}" clientguid="{{clientguid}}" data-previewurl="{{stepurl}}"><span style="font-size:18px;">{{step}}</span></span>{{/buttonexurl}}{{/upfile}}
		</div>
		<ul class="card-content em-table-view">
			{{#data}}
				{{^tip}}
					<li class='em-table-view-cell'>
						<span class='content-title file-name' style="float:left">
							{{^upfile}}{{filename}}<span style='margin-left:5px;color:{{qzcolor}}'>{{isqz}}</span>{{/upfile}}{{filetitle}}
						</span>
						<div class='icon-box'>
							{{^isqz}}<i class='mui-icon mui-icon-download' data-downurl="{{downloadurl}}" data-name="{{^upfile}}{{filename}}{{/upfile}}{{filetitle}}"></i>{{/isqz}}
		                </div>
		            </li>
	            {{/tip}}
       		{{/data}}
       		{{#tip}}
				<li class='em-table-view-cell'><span class='content-title file-name' style='color:#999999'>{{tip}}</span> </li>
       		{{/tip}}
		</ul>
	</li>
</ul>
{{/datagrid}}