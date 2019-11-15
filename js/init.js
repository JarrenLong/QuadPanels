var STARTZ=-1,ENDZ=-10;

function qp_show(t, l) {
	return {
		filter: 'alpha(opacity=100)',
		opacity: '1.0',
		top: t,
		left: l
	};
}
function qp_hide(t, l) {
	return {
		filter: 'alpha(opacity=40)',
		opacity: '0.4',
		top: t,
		left: l
	};
}

var QuadPanels_Settings = {
	animationTime: 500,
	quads: [
		/* Layer 1, Category panels #0-3 */
		{
			id: 'panel1_top_right',
			rect: ['0%', '50%', '50%', '50%'],
			show: qp_show('0%','50%'),
			hide: qp_hide('0%','-50%'),
			// beforeShow: function() { },
			// afterShow: function() { QuadPanels.animateZindex(0, ENDZ, STARTZ); },
			// beforeHide: function() { },
			// afterHide: function() { QuadPanels.animateZindex(0, STARTZ, ENDZ); }
		},
		{
			id: 'panel1_top_left',
			rect: ['0%', '0%', '50%', '50%'],
			show: qp_show('0%','0%'),
			hide: qp_hide('0%','-50%')
		},
		{
			id: 'panel1_bottom_left',
			rect: ['50%', '0%', '50%', '50%'],
			show: qp_show('50%','0%'),
			hide: qp_hide('50%','-50%')
		},
		{
			id: 'panel1_bottom_right',
			rect: ['50%', '50%', '50%', '50%'],
			show: qp_show('50%','50%'),
			hide: qp_hide('50%','-50%')
		},
		/* Layer 2, Content panels #4-7 */
		{
			id: 'panel2_top_right',
			rect: ['0%', '0%', '100%', '100%'],
			show: qp_show('0%','0%'),
			hide: qp_hide('-100%','0%')
		},
		{
			id: 'panel2_top_left',
			rect: ['0%', '0%', '100%', '100%'],
			show: qp_show('0%','0%'),
			hide: qp_hide('-100%','0%')
		},
		{
			id: 'panel2_bottom_left',
			rect: ['0%', '0%', '100%', '100%'],
			show: qp_show('0%','0%'),
			hide: qp_hide('-100%','0%')
		},
		{
			id: 'panel2_bottom_right',
			rect: ['0%', '0%', '100%', '100%'],
			show: qp_show('0%','0%'),
			hide: qp_hide('-100%','0%')
		},
		/* Layer 0, Explore button #8 */
		{
			id: 'panel_center',
			rect: [window.width - 48, 0, '48px', window.height],
			show: {
				top: '0',
				left: (window.width - 48) + 'px'
			},
			hide: {
				top: '0',
				left: '48px'
			}
		},
	]
};


function showPanel(sectionId){
	$('.title').removeClass('hide');
	$('section').addClass('hide');

	// Hide everything but the specified panel and make it fullscreen
	QuadPanels.showOnly(sectionId);
	QuadPanels.resize(sectionId, 0, 0, '100%', '100%', true);

	QuadPanels.show(8);
}

function init() {
	// Add input placeholder support to IE <= 9
	var _IEVersion = (navigator.userAgent.match(/MSIE ([0-9]+)\./) ? parseInt(RegExp.$1) : 99);
	if (_IEVersion < 10) {
		$('form').n33_formerize();
	}
	
	// Submit button CSS handler
	$('form .button.submit').click(function(e) {
		e.preventDefault();
		$(this).closest('form').submit();
	});
	
	// Initialize QuadPanels and hook up some click() handlers
	QuadPanels.init(QuadPanels_Settings);

	$('#panel1_top_right').click(function() { showPanel(4); });
	$('#panel1_top_left').click(function() { showPanel(5); });
	$('#panel1_bottom_left').click(function() { showPanel(6); });
	$('#panel1_bottom_right').click(function() { showPanel(7); });
	$('#panel_center').click(function() { QuadPanels.showAll(); QuadPanels.hide(8); });

	QuadPanels.hide(8);
}

// Disable all Javascript by commenting out the following line
$(init);

