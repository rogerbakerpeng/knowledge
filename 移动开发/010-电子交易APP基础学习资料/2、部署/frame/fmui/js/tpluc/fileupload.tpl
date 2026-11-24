{{#datagrid}}
			<div class="file-container">
				<div class="file-header clearfix">
					<span class="l header-title" tips-content="{{filetooltip}}">
						{{{filename}}}
					</span>
					<span class="l icon icon-tips"></span>
					<span class="r icon icon-input" filecode="{{filecode}}"></span>
				</div>
				<ul filecode="{{filecode}}">
				{{#attachex}}
				<li class="em-table-view-cell">
					<div class="em-attach-info">
						<img src="" alt="" filename="{{name}}"/>
						<div class="em-attach-content">
							<p class="em-attach-name">{{name}}</p>
							<p class="size">{{size}}</p>
						</div>
						<span class="attach-icon">
                    		<i class="em-icon-arrow mui-icon mui-icon-arrowdown"></i>
               			</span>
					</div>
					<div class="em-collapse-content">
						<a class="attach-button btn-red" data-id="{{id}}">删除</a>
						<a class="attach-button" filename="{{name}}" data-url="{{previewurl}}">预览</a>
					</div>
				</li>
				{{/attachex}}
				{{^attachex}}
					<li class="em-table-view-cell noattach">
						<img src="../../../frame/fmui/css/extend/images_fileinput/img_zwfj_btn.png" />
						<span>暂无附件</span>
					</li>
				{{/attachex}}
				</ul>
			</div>
			{{/datagrid}}