/*
    Catalogue of Google Material Symbols used to power the Foundations →
    Iconography explorer, which mirrors https://fonts.google.com/icons.

    Symbols are rendered by the Material Symbols variable font: a `<span>` with
    the `material-symbols-outlined` / `-rounded` / `-sharp` class renders the
    glyph whose ligature matches the text content (e.g. `home`). The variable
    font exposes four axes that the explorer controls live:

      • FILL  0 → 1     unfilled / filled
      • wght  100 → 700 stroke weight
      • GRAD  -25 → 200 emphasis (grade)
      • opsz  20 → 48   optical size

    Names below are the canonical Material Symbols ligature names. Add more by
    appending the ligature name to the relevant category.
*/

export type MaterialSymbolStyle = 'outlined' | 'rounded' | 'sharp'

export interface SymbolStyleOption {
    id: MaterialSymbolStyle
    label: string
    /** CSS class supplied by the Google Fonts stylesheet for this style. */
    className: string
}

export const symbolStyles: SymbolStyleOption[] = [
    { id: 'outlined', label: 'Outlined', className: 'material-symbols-outlined' },
    { id: 'rounded', label: 'Rounded', className: 'material-symbols-rounded' },
    { id: 'sharp', label: 'Sharp', className: 'material-symbols-sharp' },
]

export interface SymbolCategory {
    id: string
    label: string
    icons: string[]
}

/**
 * Icons grouped by the same broad categories Google uses to filter the gallery.
 * Every string is a valid Material Symbols ligature name.
 */
export const symbolCategories: SymbolCategory[] = [
    {
        id: 'common',
        label: 'Common',
        icons: [
            'home', 'search', 'settings', 'menu', 'close', 'done', 'add', 'remove',
            'check', 'check_circle', 'cancel', 'info', 'help', 'delete', 'edit',
            'favorite', 'star', 'bookmark', 'visibility', 'visibility_off',
            'more_vert', 'more_horiz', 'refresh', 'history', 'schedule', 'language',
            'dashboard', 'tune', 'filter_list', 'sort', 'open_in_new', 'launch',
        ],
    },
    {
        id: 'actions',
        label: 'Actions',
        icons: [
            'login', 'logout', 'account_circle', 'verified', 'lock', 'lock_open',
            'shopping_cart', 'shopping_bag', 'store', 'payment', 'credit_card',
            'receipt_long', 'calculate', 'build', 'accessibility_new', 'accessible',
            'fullscreen', 'fullscreen_exit', 'zoom_in', 'zoom_out', 'print', 'save',
            'share', 'download', 'upload', 'content_copy', 'content_paste', 'undo',
            'redo', 'bug_report', 'code', 'terminal', 'extension', 'api', 'hub',
            'rule', 'task_alt', 'pending', 'autorenew', 'sync', 'cached', 'flag',
        ],
    },
    {
        id: 'navigation',
        label: 'Navigation',
        icons: [
            'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward',
            'arrow_back_ios', 'arrow_forward_ios', 'arrow_drop_down', 'arrow_drop_up',
            'chevron_left', 'chevron_right', 'expand_more', 'expand_less',
            'unfold_more', 'unfold_less', 'first_page', 'last_page', 'north', 'south',
            'east', 'west', 'navigate_before', 'navigate_next', 'apps', 'menu_open',
            'double_arrow', 'subdirectory_arrow_right', 'swap_horiz', 'swap_vert',
        ],
    },
    {
        id: 'communication',
        label: 'Communication',
        icons: [
            'call', 'call_end', 'phone', 'phone_in_talk', 'voicemail', 'dialpad',
            'chat', 'chat_bubble', 'comment', 'forum', 'sms', 'message', 'email',
            'mail', 'mark_email_read', 'mark_email_unread', 'contact_mail',
            'contact_phone', 'contacts', 'rss_feed', 'notifications',
            'notifications_active', 'notifications_off', 'notifications_none',
            'ring_volume', 'support_agent', 'live_help', 'quick_phrases',
        ],
    },
    {
        id: 'media',
        label: 'Audio & video',
        icons: [
            'play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous',
            'fast_forward', 'fast_rewind', 'replay', 'volume_up', 'volume_down',
            'volume_off', 'volume_mute', 'mic', 'mic_off', 'videocam', 'videocam_off',
            'music_note', 'library_music', 'queue_music', 'playlist_add', 'repeat',
            'shuffle', 'equalizer', 'album', 'radio', 'headphones', 'speaker', 'hd',
            'subscriptions', 'video_library', 'movie', 'theaters', 'slideshow',
        ],
    },
    {
        id: 'image',
        label: 'Image',
        icons: [
            'image', 'photo', 'collections', 'photo_library', 'add_a_photo', 'crop',
            'rotate_left', 'rotate_right', 'flip', 'brush', 'palette', 'color_lens',
            'colorize', 'filter', 'filter_vintage', 'blur_on', 'exposure',
            'brightness_5', 'wb_sunny', 'flash_on', 'flash_off', 'panorama',
            'landscape', 'portrait', 'image_search', 'broken_image', 'timer',
            'camera', 'photo_camera', 'camera_alt', 'auto_awesome', 'gradient',
        ],
    },
    {
        id: 'maps',
        label: 'Maps & travel',
        icons: [
            'place', 'location_on', 'location_off', 'my_location', 'near_me', 'map',
            'directions', 'directions_car', 'directions_walk', 'directions_bike',
            'directions_bus', 'directions_subway', 'directions_railway',
            'directions_boat', 'flight', 'train', 'tram', 'local_taxi',
            'local_shipping', 'local_parking', 'local_gas_station', 'local_cafe',
            'local_dining', 'local_hospital', 'local_pharmacy', 'restaurant',
            'hotel', 'beach_access', 'terrain', 'traffic', 'pin_drop', 'explore',
            'public', 'satellite_alt', 'layers', 'route',
        ],
    },
    {
        id: 'device',
        label: 'Device & hardware',
        icons: [
            'smartphone', 'tablet', 'laptop', 'computer', 'desktop_windows', 'watch',
            'tv', 'keyboard', 'mouse', 'headset', 'memory', 'storage', 'sd_card',
            'sim_card', 'battery_full', 'battery_charging_full', 'bluetooth', 'wifi',
            'wifi_off', 'signal_cellular_alt', 'gps_fixed', 'cast', 'devices',
            'router', 'scanner', 'usb', 'power', 'settings_remote', 'speaker_group',
            'camera_roll', 'sensors', 'dns',
        ],
    },
    {
        id: 'file',
        label: 'File & folder',
        icons: [
            'folder', 'folder_open', 'create_new_folder', 'insert_drive_file',
            'description', 'article', 'attachment', 'cloud', 'cloud_upload',
            'cloud_download', 'cloud_done', 'cloud_off', 'file_copy', 'file_download',
            'file_upload', 'drive_file_move', 'snippet_folder', 'topic', 'grid_view',
            'view_list', 'request_quote', 'picture_as_pdf', 'folder_shared',
            'text_snippet', 'note_add', 'upload_file', 'download_for_offline',
        ],
    },
    {
        id: 'social',
        label: 'Social',
        icons: [
            'people', 'person', 'person_add', 'group', 'groups', 'group_add',
            'sentiment_satisfied', 'sentiment_dissatisfied', 'mood', 'mood_bad',
            'emoji_emotions', 'emoji_events', 'emoji_objects', 'emoji_people',
            'school', 'work', 'handshake', 'diversity_3', 'volunteer_activism',
            'recommend', 'military_tech', 'psychology', 'cake', 'celebration',
            'sports_esports', 'fitness_center', 'self_improvement', 'thumb_up',
            'thumb_down', 'star_rate', 'workspace_premium',
        ],
    },
    {
        id: 'toggle',
        label: 'Toggle & text',
        icons: [
            'check_box', 'check_box_outline_blank', 'radio_button_checked',
            'radio_button_unchecked', 'toggle_on', 'toggle_off',
            'indeterminate_check_box', 'format_bold', 'format_italic',
            'format_underlined', 'format_align_left', 'format_align_center',
            'format_align_right', 'format_list_bulleted', 'format_list_numbered',
            'format_quote', 'format_color_text', 'format_size', 'title',
            'text_fields', 'link', 'attach_file', 'strikethrough_s', 'border_color',
            'functions', 'table_chart',
        ],
    },
    {
        id: 'health',
        label: 'Health',
        icons: [
            'medical_services', 'health_and_safety', 'healing', 'medication',
            'vaccines', 'monitor_heart', 'ecg_heart', 'bloodtype', 'masks', 'sick',
            'coronavirus', 'emergency', 'medical_information', 'dentistry',
            'elderly', 'elderly_woman', 'wheelchair_pickup', 'hearing',
            'pregnant_woman', 'child_care', 'personal_injury', 'biotech', 'science',
            'psychology_alt', 'glucose', 'pill', 'nutrition', 'cardiology',
        ],
    },
]

/** Flat, de-duplicated list of every catalogued symbol name. */
export const allSymbols: string[] = Array.from(
    new Set(symbolCategories.flatMap(category => category.icons))
)

/** Stylesheet URL exposing all three styles across the four variable axes. */
export const materialSymbolsHref =
    'https://fonts.googleapis.com/css2?' +
    [
        'family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        'family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        'family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    ].join('&') +
    '&display=block'
